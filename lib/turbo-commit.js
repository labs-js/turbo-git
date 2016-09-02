#!/usr/bin/env node
var program = require('commander'),
    childProcess = require('child_process'),
    inquirer = require('inquirer'),
    configParser = require('../bin/config-parser');

require('colors');

program
    .arguments('<commitMessage>')
    .action(doTurboCommit)
    .parse(process.argv);

function doTurboCommit(commitMessage) {
    'use strict';
    //SHOW TAG LIST FOR SELECTION
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'selection',
                message: 'Select tag for your turbo-commit',
                choices: configParser.getTagsFormat()
            }])
        .then(function (answers) {
            //Exec git branch to check if exist .git files
            var checkRepoExistenceCommand = childProcess.exec('git branch');

            checkRepoExistenceCommand.stderr.on('data', function (data) {
                console.log(data.red);
            });

            checkRepoExistenceCommand.on('close', function (code) {
                //execute commit
                if (code === 0) { //0 means ok, 128 means error
                    commitMessage = answers.selection + ' ' + commitMessage;
                    childProcess.exec('git commit -m "' + commitMessage + '"', function (error) {
                        if (error) {
                            console.log('Nothing to commit, you need to do a `git add` before commit'.magenta);
                        }
                    });
                }
            });
        });
}
