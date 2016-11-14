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
        var conf = {};

        conf.config = configJson;
        conf.commits = getProperty('commitConvention').commitDesc;
        conf.turboLog = getProperty('turboLog');

        return {
            getTagsFormat: getTagsFormat,
            getCommitConf: getCommitConf,
            getProperty: getProperty,
            getLogCommand: getLogCommand,
        };

        ////////////////

        function getTagsFormat() {
            var tagFormat = [],
                colors = require('colors/safe');

            conf.commits.forEach(function(val) {
                tagFormat.push({
                    'name': colors[val.color](val.tag + ' : ' + val.desc),
                    'value': val.tag
                });
            });
            return tagFormat;
        }

        function getCommitConf() {
            return conf.commits;
        }

        function getLogCommand() {
            return conf.turboLog.gitLogCommand;
        }

        function getCommitPromptText(propName) {
            var validProps = ['title', 'component', 'desc'],
                propInConf;

            if ( !(propName in validProps) ) {
                return false;
            }

            propInConf = conf.turboCommit[propName];

            if (propInConf == "") {
                return false;
            }

            return propInConf;
        }

        function getProperty(prop) {
            if (!conf.config.hasOwnProperty(prop)) {
                utils.showError('Undefined Property ' + (prop || '') +
                    '\nPlease check your .turbocommit file');
                process.exit(1);
            }
            return conf.config[prop];
        }
    })(_configJson || configJson, _process || process);
};
