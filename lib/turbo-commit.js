#!/usr/bin/env node
(function () {
    'use strict';

    var childProcess = require('child_process'),
        inquirer = require('inquirer'),
        configParser = require('../bin/config-parser');

    require('colors');

    init();
    //SHOW TAG LIST FOR SELECTION
    function init(){
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'tag',
                    message: 'Select tag for your turbo-commit',
                    choices: configParser.getTagsFormat()
                }])
            .then(function (answers) {
                var tagTittle = answers.tag;

                function onTitlePrompt(){
                    onAskTitle().then(function (commitTitle) {
                        if(!commitTitle){
                            console.log('Title is mandatory'.red);
                            return onTitlePrompt();
                        }
                        onCommit(tagTittle + ' ' + commitTitle);
                    });
                }

                onTitlePrompt();
            });
    }

    function onAskTitle() {
        return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Type the commit tittle'
                }])
            .then(function (answers) {
                return answers.title;
            });
    }

    function onCommit(commitMessage) {
        //Exec git branch to check if exist .git files
        var checkRepoExistenceCommand = childProcess.exec('git branch');
        checkRepoExistenceCommand.stderr.on('data', function (data) {
            console.log(data.red);
        });

        checkRepoExistenceCommand.on('close', function (code) {
            //execute commit
            if (code === 0) { //0 means ok, 128 means error
                childProcess.exec('git commit -m "' + commitMessage + '"', function (error) {
                    if (error) {
                        console.log('Nothing to commit, you need to do a `git add` before commit'.magenta);
                    }
                });
            }
        });
    }

})();

