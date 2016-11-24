#!/usr/bin/env node
(function () {
    'use strict';
    var childProcess = require('child_process'),
        configParser = require('turbo-git-config').parser,
        utils = require('turbo-git-config').utils,
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
        gitLogUserCommand = configParser.getLogCommand();
        childProcess.exec(gitLogUserCommand, executeGitLogCallback);
    }

    function executeGitLogCallback(err, gitLogFull) {
        if (err) {
            utils.showError(err);
            return;
        }
        parseLog(gitLogFull, gitLogTitles);
    }

    function escapeSpecialCharactersRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    function parseLog(gitLogFull, gitLogTitles) {
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
                gitLogFull = gitLogFull.replace(getRegex(commitMsg), colors[prop.color](commitMsg));
            });
        });
        printColorLog(gitLogFull);
    }

    function printColorLog (gitParsedLog) {
        console.log(gitParsedLog);
    }
}());
