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
                        showCommitTitlePrompt(tagTitle);
                    });
            }
        });
    }

    function showCommitTitlePrompt(tagTitle) {
        function onTitlePrompt() {
            onAskTitle().then(function (commitTitle) {
                if (!commitTitle) {
                    messageHandler.showError('Title is mandatory');
                    return onTitlePrompt();
                }
                onCommit(tagTitle + ' ' + commitTitle);
            });
        }

        onTitlePrompt();
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

    function onCommit(commitMessage) {
        childProcess.exec('git commit -m "' + commitMessage + '"', function (error) {
            if (error) {
                messageHandler.showError('Nothing to commit, you need to do a `git add` before commit');
            }
        });
    }
})();

