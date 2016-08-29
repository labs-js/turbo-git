#!/usr/bin/env node
var program = require('commander');
const exec = require('child_process').exec;
const inquirer = require('inquirer');
const colors = require('colors');


var _self = this;
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
                    {
                        name: '[ADD] : features commits, adding lines of code'.green,
                        value: "[ADD]"
                    },
                    {
                        name: '[FIX] : bugfixing commits'.yellow,
                        value: "[FIX]"
                    },
                    {
                        name: '[MOD] : modifying the way of do something, tiny changes'.blue,
                        value: "[MOD]"
                    },
                    {
                        name: '[DEL] : removing lines of code, code cleanup, remove old lib,unused assets, etc.'.red,
                        value: "[DEL]"
                    },
                    {
                        name: '[REF] : commits part of a refactor'.cyan,
                        value: "[REF]"
                    },
                    {
                        name: '[BRK] : breaking change commits'.magenta,
                        value: "[BRK]"
                    },
                    {
                        name: '[MRG] : merge commits'.white,
                        value: "[MRG]"
                    },
                ]
            }]).then(function (answers) {
            var tag = answers.selection;
            commitMessage = tag + " " + commitMessage;

            //Exec git commit
            exec('git commit -m "' + commitMessage + '"' , (error, stdout, stderr) => {
                if (error) {
                    console.error('exec error: ${error}', error);
                    return;
                }
            });

        });

    }).parse(process.argv);

