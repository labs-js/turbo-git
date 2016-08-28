#!/usr/bin/env node
var program = require('commander');
const exec = require('child_process').exec;
const inquirer = require('inquirer');
const colors = require('colors');

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
                    '[ADD] : features commits, adding lines of code'.green,
                    '[DEL] : removing lines of code, code cleanup, remove old lib,unused assets, etc.'.red,
                    '[MOD] : modifying the way of do something, tiny changes'.blue,
                    '[FIX] : bugfixing commits'.yellow,
                    '[REF] : commits part of a refactor'.cyan,
                    '[BRK] : breaking change commits'.magenta,
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
