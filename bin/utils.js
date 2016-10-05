#!/usr/bin/env node
module.exports = function (_console) {
    'use strict';
    return (function (console) {
        var childProcess = require('child_process'),
            Promise = require('promise');

        require('colors');

        return {
            checkGitRepoExistence: checkGitRepoExistence,
            showError: showError
        };

        function showError(errorMessage) {
            var error = errorMessage || 'error';

            console.log(error.magenta);
        }

        //Exec git branch to check if exist .git files
        function checkGitRepoExistence () {
            return new Promise(function (resolve, reject) {
                var checkRepoCommand = childProcess.exec('git branch');

                checkRepoCommand.stderr.on('data', function (err) {
                    reject(err);
                });

                checkRepoCommand.on('close', function (code) {
                    if (code === 0) { //0 means ok, 128 means error
                        resolve();
                    }
                });
            });
        }
    })(_console || console);
};
