#!/usr/bin/env node
(function () {
    'use strict';
    var childProcess = require('child_process'),
        configParser = require('../bin/config-parser')(),
        utils = require('../bin/utils')(),
        colors = require('colors/safe'),
        gitLogTitles;

    (function executePreGitLog() {
        var gitLogCommand = "git --no-pager log --pretty='%s' -n100";

        childProcess.exec(gitLogCommand, executeGitPreLogCallback);
    })();

    function executeGitPreLogCallback(err, gitTitles) {
        var gitLogUserCommand;

        if (err) { utils.showError(err); return; }
        gitLogTitles = gitTitles;
        gitLogUserCommand = configParser.getProperty('git-log-command');
        childProcess.exec(gitLogUserCommand, executeGitLogCallback);
    }

    function executeGitLogCallback(err, gitLogFull) {

        if (err) {
            utils.showError(err);
            return;
        }
        printLog(gitLogFull, gitLogTitles);
    }

    function escapeSpecialCharactersRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    function printLog(gitLogFull, gitLogTitles) {
        var commitConf = configParser.getCommitConf();

        function getRegex(tag) {
            return new RegExp(escapeSpecialCharactersRegex(tag) + '.*$', 'mg');
        }

        function getRegexMatch(gitLog, regex) {
            return gitLog.match(regex);
        }

        commitConf.forEach(function (prop) {
            var ArrayCommitsType = getRegexMatch(gitLogTitles, getRegex(prop.tag)) || [];

            ArrayCommitsType.forEach(function (commitMsg) {
                var defaultCommitMsg = '  ' + commitMsg;

                gitLogFull = gitLogFull.replace(getRegex(commitMsg), colors[prop.color](defaultCommitMsg));
            });
        });
        //print colorized log:
        console.log(gitLogFull);
    }
}());
