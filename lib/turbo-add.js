#!/usr/bin/env node
(function () {
    'use strict';

    var childProcess = require('child_process'),
        inquirer = require('inquirer'),
        configParser = require('../bin/config-parser'),
        messageHandler = require('../bin/message-handler');


    init();

    function init() {
        var gitStatusPorcelain = childProcess.exec('git status -s');

        gitStatusPorcelain.stdout.on('data', function (data) {
            var files = getNoStagedFiles(data);

            if(!files){
                messageHandler.showError('No files to add');
                return;
            }
            promptFileSelection(files);
        });

    };

    /**
     * returns string 'file1 file2 file2'
     * @param data
     */
    function getNoStagedFiles(data) {
        var files = data.match(noStagedFilesRegex(data)), //with ?? string
            formattedArray = [];

        if (!files){
            return;
        }

        files.forEach(function(item,index){
            formattedArray.push(item.replace(/\?\?./,""));
        });
        return formattedArray;
    }

    function noStagedFilesRegex() {
        return new RegExp('\\?\\?.*', 'mg');
    };

    function promptFileSelection(files) {

        inquirer.prompt([
            {
                type: 'checkbox',
                message: 'Select files to add',
                name: 'files',
                choices: files
            }
        ]).then(function (selection) {
            var command = 'git add ' + selection.files.join(" ");

            var gitAdd = childProcess.exec(command);

            gitAdd.stdout.on('data', function (data) {
                console.log(data);
            });

            gitAdd.stderr.on('err', function (err) {
                console.log(err);
            });
        });
    }


})();