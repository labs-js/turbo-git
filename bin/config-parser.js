#!/usr/bin/env node

var shell = require('shelljs'),
    fs = require('fs'),
    path = require('path'),
    utils = require('./utils')();

shell.config.silent = false;

module.exports = function(_configJson, _process) {
    'use strict';
    var configJson,
        dotFileConfPath;

    dotFileConfPath = path.join(utils.getGitRepoMainPath(), '.turbocommit');

    if (shell.test('-f', dotFileConfPath)) { //check if there a .turbocommit config file
        configJson = JSON.parse(fs.readFileSync(dotFileConfPath, 'utf8'));
    } else { //otherwise use default conf
        configJson = require('./config.json');
    }

    return (function(configJson, process) {
        var self = {};

        self.config = configJson;
        self.commits = getProperty('commitConvention').commitDesc;
        self.turboLog = getProperty('turboLog');

        return {
            getTagsFormat: getTagsFormat,
            getCommitConf: getCommitConf,
            getProperty: getProperty,
            getLogCommand: getLogCommand
        };

        ////////////////

        function getTagsFormat() {
            var tagFormat = [],
                colors = require('colors/safe');

            self.commits.forEach(function (val) {
                tagFormat.push({
                    'name': colors[val.color](val.tag + ' : ' + val.desc),
                    'value': val.tag
                });
            });
            return tagFormat;
        }

        function getCommitConf() {
            return self.commits;
        }

        function getProperty(prop) {
            if (!self.config.hasOwnProperty(prop)) {
                utils.showError('Undefined Property ' + (prop || '') +
                    '\nPlease check your .turbocommit file');
                process.exit(1);
            }
            return self.config[prop];
        }
    })(_configJson || configJson, _process || process);
};
