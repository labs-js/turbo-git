#!/usr/bin/env node
/**
 * How porcelain works
 * When a new file is created , it will add a ?? before the file
 * When a file is modified, it shows ' M'. Yes, one space and M (this has a reason)
 * When a file was modified and added to the staging area, and modified once again, it shows MM
 * (that's why there is an space for the modified files, to show the output aligned)
 */
(function () {
    'use strict';

    var childProcess = require('child_process'),
        inquirer = require('inquirer'),
        configParser = require('../bin/config-parser'),
        messageHandler = require('../bin/message-handler');


    init();

    function init() {

        var gitStatusPorcelain = childProcess.exec('git status --porcelain');

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
        var newFiles = data.match(newFilesRegex(data)), //with ?? and M string
            formattedArray = [];

        if (!newFiles){
            return;
        }

        newFiles.forEach(function(item,index){
            item = item.replace(/^ M/,"");
            item = item.replace(/^MM/,"");
            item = item.replace(/\?\?./,"");
            formattedArray.push(item);
        });
        return formattedArray;
    }

    function newFilesRegex() {
        return new RegExp('(\\?\\?.*)|(^( M|MM).*)', 'mg');
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