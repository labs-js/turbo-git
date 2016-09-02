#!/usr/bin/env node
var program = require('commander'),
    childProcess = require('child_process'),
    inquirer = require('inquirer'),
    config = require('../bin/config_parser'),
    debug = false;

require('colors');

program
    .arguments('<commitMessage>')
    .action(doTurboCommit)
    .parse(process.argv);

function doTurboCommit(commitMessage) {
    'use strict';
    //SHOW TAG LIST FOR SELECTION
    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'Select tag for your turbo-commit',
            choices: config.getTagsFormat()
        }]).then(function (answers) {

        //Exec git branch to check if exist .git files
        var checkRepoExistenceCommand = childProcess.exec('git branch');

        checkRepoExistenceCommand.stderr.on('data', function(data) {
            console.log(data.red);
        });

        checkRepoExistenceCommand.on('close', function(code) {
            //execute commit
            if(code===0){ //0 means ok, 128 means error
                var tag = answers.selection;
                var message = commitMessage;
                commitMessage = tag + ' ' + commitMessage;

                var commit =  childProcess.exec('git commit -m "' + commitMessage + '"', function(error){
                    //commit.on('error'.. is not triggered by the proccess child :(
                    //commit.on('error', function(err){
                    //    console.log('[Error] You need to execute a `git add` before tc commit %s ?'.red, message);
                    //});

                    if(error){
                        console.log('[Error] You need to execute a `git add` before tc commit %s ?'.red, message);
                    }
                });

            }

        });



    });
}
