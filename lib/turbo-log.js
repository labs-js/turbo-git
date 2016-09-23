#!/usr/bin/env node
(function () {
    'use strict';
    var childProcess = require('child_process'),
        configParser = require('../bin/config-parser'),
        colors = require('colors/safe');

    (function executeGitLog() {
        var gitLogDefaultLimit = configParser.getProperty('gitLogDefaultLimit');

        childProcess.exec('git log -' + gitLogDefaultLimit + ' --reverse ', execCallback);
    })();

    function execCallback(err, gitLog) {
        if (err) {
            console.log('Error:', colors.red(err) );
            return;
        }
        printLog(gitLog);
    }

    function escapeEspecialCharactersRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    function printLog(gitLog) {
        var commitConf = configParser.getCommitConf();

        function getRegex(tag) {
            return new RegExp('^.*' + escapeEspecialCharactersRegex(tag) + '.*$', 'mg');
        }

        function getRegexMatch(gitLog, regex) {
            return gitLog.match(regex);
        }

        commitConf.forEach(function (prop) {
            var ArrayCommitsType = getRegexMatch(gitLog, getRegex(prop.tag)) || [];

            ArrayCommitsType.forEach(function (commitMsg) {
                var stringPosition = gitLog.indexOf(commitMsg),
                    subStringMsg = gitLog.substr(stringPosition, commitMsg.length);

                gitLog = gitLog.replace(subStringMsg, colors[prop.color](subStringMsg));
            });
        });
        //print colorized log:
        console.log(gitLog);
    }
}());
