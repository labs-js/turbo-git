#!/usr/bin/env node
(function () {
    'use strict';

    var childProcess = require('child_process'),
        inquirer = require('inquirer'),
        configParser = require('../bin/config-parser'),
        messageHandler = require('../bin/message-handler');


    init();

    function init() {
        // git status --porcelain | sed s/^...//
        var gitStatusPorcelain = childProcess.exec('git status --porcelain | sed s/^...//');
        gitStatusPorcelain.stdout.on('data', function (data) {
            var filesObjArray = getFiles(data);

            inquirer.prompt([
                {
                    type: 'checkbox',
                    message: 'Select files to add',
                    name: 'files',
                    choices: filesObjArray,
                    validate: function (answer) {
                        if (answer.length < 1) {
                            return 'You must choose at least one topping.';
                        }
                        return true;
                    }
                }
            ]).then(function (answers) {
                console.log(JSON.stringify(answers, null, '  '));
            });
        });

    };

    function getFiles(data) {
        var files = data.split('\n'),
            filesObjArray = [];

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file) {
                var oFile = {};
                oFile["name"] = file;
                filesObjArray.push(oFile);
            }

        }
        return filesObjArray;
    }

})();