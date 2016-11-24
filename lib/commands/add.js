#!/usr/bin/env node

/**
 * How porcelain works
 * When a new file is created , it will add a ?? before the file
 * When a file is modified, it shows ' M'. Yes, one space and M (this has a reason)
 * When a file was modified and added to the staging area, and modified once again, it shows MM
 * (that's why there is an space for the modified files, to show the output aligned)
 */
(function() {
    'use strict';

    var childProcess = require('child_process'),
        inquirer = require('inquirer'),
        utils = require('turbo-git-config').utils,
        addAll = 'add all';

    function Add() {
        this.init = function() {
            var gitStatusPorcelain = childProcess.exec('git status --porcelain');

            gitStatusPorcelain.stdout.on('data', function(data) {
                var files = this.getNoStagedFiles(data);

                if (files.length === 0) {
                    utils.showError('No files to add');
                    return;
                }

                files.unshift(addAll);
                this.promptFileSelection(files);

            }.bind(this));
        };

        /**
         * returns string 'file1 file2 file2'
         * @param data
         */
        this.getNoStagedFiles = function(data) {
            var newFiles = data.match(this.newFilesRegex(data)) || [], //with ?? and M string
                formattedArray = [];

            newFiles.forEach(function(item, index) {
                item = item.replace(/^ M/, '');
                item = item.replace(/^MM/, '');
                item = item.replace(/\?\?./, '');
                formattedArray.push(item);
            });
            return formattedArray;
        };

        this.newFilesRegex = function() {
            return new RegExp('(\\?\\?.*)|(^( M|MM).*)', 'mg');
        };

        this.promptFileSelection = function(files) {
            inquirer.prompt([{
                type: 'checkbox',
                message: 'Select files to add',
                name: 'files',
                choices: files
            }]).then(function(selection) {
                var command, gitAdd;

                if (selection.files.indexOf(addAll) > -1) {
                    command = 'git add .';
                } else {
                    command = 'git add ' + selection.files.join(' ');
                }

                gitAdd = childProcess.exec(command);

                gitAdd.stdout.on('data', function(data) {
                    console.log(data);
                });

                gitAdd.stderr.on('err', function(err) {
                    console.log(err);
                });
            });
        };
    }

    module.exports = Add;
})();
