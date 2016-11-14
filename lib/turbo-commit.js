#!/usr/bin/env node

(function () {
    'use strict';

    var childProcess = require('child_process'),
        inquirer = require('inquirer'),
        configParser = require('../bin/config-parser')(),
        utils = require('../bin/utils')();

    require('colors');

    init();

    function init() {
        inquirer
            .prompt([{
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

    function showCommitPrompt(tagTitle) {
        var commitText, parseDesc;

        function onTitlePrompt() {
            onAskFor('title').then(function (commitTitle) {
                if (!commitTitle) {
                    utils.showError('Title is mandatory');
                    return onTitlePrompt();
                }
                //parse mandatory title for commit
                commitText = tagTitle + ' ' + commitTitle;

                onAskFor('desc').then(function (commitDesc) {
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


    function onAskFor(field) {
        var fieldTexts;

        fieldTexts = {
            'title': 'Type the commit title:',
            'desc': 'Commit description (leave it empty for omit):',
            'component': ''
        };

        return inquirer
            .prompt([{
                type: 'input',
                name: field,
                message: fieldTexts[field]
            }])
            .then(function (answers) {
                return answers[field];
            });
    }

    function execCommit(commitMessage) {
        childProcess.exec('git commit -m "' + commitMessage + '"', function (error) {
            if (error) {
                utils.showError('Nothing to commit, you need to do a `git add` before commit');
            }
        });
    }
})();
