#!/usr/bin/env node
module.exports = function (_console, _process) {
    'use strict';
    return (function (console, process) {
        var childProcess = require('child_process'),
            Promise = require('promise');

        require('colors');

        return {
            checkGitRepoExistence: checkGitRepoExistence,
            getGitRepoMainPath: getGitRepoMainPath,
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

        function getGitRepoMainPath() {
            var check = childProcess.spawnSync('git',['branch']),
                err = check.stderr.toString().trim(),
                res;

            if (err) {
                showError(err);
                return process.exit(1);//exit process with code error
            }

            res = childProcess.execSync('git rev-parse --show-toplevel', {encoding: 'UTF-8'});

            return res.trim();
        }
    })(_console || console, _process || process);
};
