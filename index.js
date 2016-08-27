#!/usr/bin/env node
var program = require('commander');
const exec = require('child_process').exec;
const inquirer = require('inquirer');

program
    .arguments('<commitMessage>')
    .action(function (commitMessage) {

        //SHOW TAG LIST FOR SELECTION
        inquirer.prompt([
            {
                type: 'list',
                name: 'selection',
                message: 'Select tag for your turbo-commit',
                choices: [
                    '[ADD] : features commits, adding lines of code',
                    '[DEL] : removing lines of code, code cleanup, remove old lib,unused assets, etc.',
                    '[MOD] : modifying the way of do something, tiny changes',
                    '[FIX] : bugfixing commits',
                    '[REF] : commits part of a refactor',
                    '[BRK] : breaking change commits',
                ]
            }]).then(function (answers) {
                var tag = answers.selection.substring(0, 5);
                console.log(tag);
                commitMessage = tag + " "+ commitMessage;

                //Exec git commit
                exec('git commit -m "' + commitMessage + '"' , (error, stdout, stderr) => {
                    if (error) {
                        console.error('exec error: ${error}', error);
                        return;
                    }
                });

        });

    }).parse(process.argv);
