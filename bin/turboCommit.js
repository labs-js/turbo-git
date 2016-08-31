var childProcess = require('child_process'),
    inquirer = require('inquirer'),
    debug = false;
    require('colors');

function turboCommit(commitMessage) {
    "use strict";
    //SHOW TAG LIST FOR SELECTION
    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'Select tag for your turbo-commit',
            choices: [
                {
                    name: '[ADD] : features commits, adding lines of code'.green,
                    value: '[ADD]'
                },
                {
                    name: '[FIX] : bugfixing commits'.yellow,
                    value: '[FIX]'
                },
                {
                    name: '[MOD] : modifying the way of do something, tiny changes'.blue,
                    value: '[MOD]'
                },
                {
                    name: '[DEL] : removing lines of code, code cleanup, remove old lib,unused assets, etc.'.red,
                    value: '[DEL]'
                },
                {
                    name: '[REF] : commits part of a refactor'.cyan,
                    value: '[REF]'
                },
                {
                    name: '[BRK] : breaking change commits'.magenta,
                    value: '[BRK]'
                },
                {
                    name: '[MRG] : merge commits'.white,
                    value: '[MRG]'
                }
            ]
        }]).then(function (answers) {
        var tag = answers.selection;
        commitMessage = tag + " " + commitMessage;
        //Exec git commit
        childProcess.exec('git commit -m "' + commitMessage + '"', errCallback);

        function errCallback(error) {
            if (error && debug) { console.error('exec error: ', error); }
            if (error) { console.log('You need to do a `git add` before do a Turbo Commit'.magenta); }
        }
    });
}

module.exports = turboCommit;
