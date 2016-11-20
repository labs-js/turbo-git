#!/usr/bin/env node

(function () {
    'use strict';

    var childProcess = require('child_process'),
        inquirer = require('inquirer'),
        configParser = require('./../config/config-parser')(),
        utils = require('./../config/utils')(),
        Promise = require('promise');

    require('colors');

    init();

    function init() {
        inquirer
            .prompt([{
                type: 'list',
                name: 'tag',
                message: configParser.getCommitPromptText('tag'),
                choices: configParser.getTagsFormat()
            }])
            .then(function (answers) {
                var tagTitle = answers.tag;

                showPrompts(tagTitle);
            });
    }

    function showPrompts(tagTitle) {
        var commitText = '',
            tagTitleLength = tagTitle.length,
            fieldTexts = {
                'title': configParser.getCommitPromptText('title'),
                'component': configParser.getCommitPromptText('component'),
                'desc': configParser.getCommitPromptText('desc')
            };

        commitText += tagTitle;

        onComponentPrompt('component', fieldTexts.component).then(function (componentInput) {
            if (componentInput){
                commitText += '('+componentInput+'): ';
            }
            nextStepTitle();
        });

        function nextStepTitle() {
            onTitlePrompt('title', fieldTexts.title).then(function (titleInput) {
                commitText += titleInput;
                nextStepDesc();
            });
        }

        function nextStepDesc() {
            onDescPrompt('desc', fieldTexts.desc, tagTitleLength).then(function (descInput) {
                commitText += descInput;
                execCommit(commitText);
            });
        }
    }

    function onComponentPrompt(field, desc) {
        if (!desc) { return Promise.resolve(''); }
        return onAskFor(field, desc).then(function (component) {
            if (!component) {
                return '';
            }
            return component;
        });
    }

    function onTitlePrompt(field, desc) {
        if (!desc) { return Promise.resolve(''); }
        return onAskFor(field, desc).then(function (title) {
            if (!title) {
                utils.showError('Title is mandatory');
                return onTitlePrompt(field, desc);
            }
            return Promise.resolve(' ' + title);
        });
    }


    function onDescPrompt(field, desc, tagTitleLength) {
        var parseDesc;

        if (!desc) { return Promise.resolve(''); }
        return onAskFor(field, desc).then(function (commitDesc) {
            if (commitDesc) {
                parseDesc = '\n\n';
                parseDesc += new Array(tagTitleLength).join(' ');
                parseDesc += ' - ' + commitDesc;
                return parseDesc;
            }
            return '';
        });
    }


    function onAskFor(field, text) {
        return inquirer
            .prompt([{
                type: 'input',
                name: field,
                message: text
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
