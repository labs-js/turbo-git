#!/usr/bin/env node
var program = require('commander'),
    childProcess = require('child_process'),
    inquirer = require('inquirer'),
    config = require('../bin/config'),
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
            var tag = answers.selection;

            commitMessage = tag + ' ' + commitMessage;
            //Exec git commit
            childProcess.exec('git commit -m "' + commitMessage + '"', errCallback);

            function errCallback(error) {
                if (error && debug) { console.error('exec error: ', error); }
                if (error) { console.log('You need to do a `git add` before do a Turbo Commit'.magenta); }
            }
        });
}
