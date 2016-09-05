#!/usr/bin/env node
(function () {
    'use strict';

    var childProcess = require('child_process'),
        inquirer = require('inquirer'),
        configParser = require('../bin/config-parser'),
        messageHandler = require('../bin/message-handler');

    require('colors');

    init();
    //SHOW TAG LIST FOR SELECTION
    function init() {
        //Exec git branch to check if exist .git files
        var checkRepoExistenceCommand = childProcess.exec('git branch');

        checkRepoExistenceCommand.stderr.on('data', function (data) {
            messageHandler.showError(data);
        });

        checkRepoExistenceCommand.on('close', function (code) {
            if (code === 0) { //0 means ok, 128 means error
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'tag',
                            message: 'Select tag for your turbo-commit',
                            choices: configParser.getTagsFormat()
                        }])
                    .then(function (answers) {
                        var tagTitle = answers.tag;

                        showCommitPrompt(tagTitle);
                    });
            }
        });
    }

    function showCommitPrompt(tagTitle) {
        var commitText, parseDesc;

        function onTitlePrompt() {
            onAskTitle().then(function (commitTitle) {
                if (!commitTitle) {
                    messageHandler.showError('Title is mandatory');
                    return onTitlePrompt();
                }
                //parse mandatory title for commit
                commitText = tagTitle + ' ' + commitTitle;
                //parse optional description fot the commit
                onAskDesc().then(function (commitDesc) {
                    if (commitDesc) {
                        parseDesc = '\n\n';
                        parseDesc += new Array(tagTitle.length).join(' ');
                        parseDesc += ' - ' + commitDesc;
                        commitText += parseDesc;
                    }
                    execCommit(commitText);
                });
            });
        }

        onTitlePrompt();
    }

    function onAskDesc() {
        return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'description',
                    message: 'Commit description (leave it empty for omit):'
                }])
            .then(function (answers) {
                return answers.description;
            });
    }

    function onAskTitle() {
        return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Type the commit title:'
                }])
            .then(function (answers) {
                return answers.title;
            });
    }

    function execCommit(commitMessage) {
        childProcess.exec('git commit -m "' + commitMessage + '"', function (error) {
            if (error) {
                messageHandler.showError('Nothing to commit, you need to do a `git add` before commit');
            }
        });
    }
})();

