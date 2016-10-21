#!/usr/bin/env node
(function () {
    'use strict';
    var childProcess = require('child_process'),
        configParser = require('../bin/config-parser')(),
        utils = require('../bin/utils')(),
        colors = require('colors/safe');

    (function executeGitLog() {
        var gitLogCommand = configParser.getProperty('git-log-command');

        childProcess.exec(gitLogCommand, execCallback);
    })();

    function execCallback(err, gitLog) {
        if (err) {
            utils.showError(err);
            return;
        }
        printLog(gitLog);
    }

    function escapeSpecialCharactersRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    function printLog(gitLog) {
        var commitConf = configParser.getCommitConf();

        function getRegex(tag) {
            return new RegExp('^.*' + escapeSpecialCharactersRegex(tag) + '.*$', 'mg');
        }

        function getRegexMatch(gitLog, regex) {
            return gitLog.match(regex);
        }

        commitConf.forEach(function (prop) {
            var ArrayCommitsType = getRegexMatch(gitLog, getRegex(prop.tag)) || [];

            ArrayCommitsType.forEach(function (commitMsg) {
                gitLog = gitLog.replace(getRegex(commitMsg), colors[prop.color](commitMsg));
            });
        });
        //print colorized log:
        console.log(gitLog);
    }
}());
