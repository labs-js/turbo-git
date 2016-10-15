#!/usr/bin/env node
module.exports = function (configJson) {
    'use strict';

    configJson =  configJson || require('./config.json');

    return (function (configJson) {
        var self = {};

        self.config = configJson;
        self.commits = getProperty('commits');
        initConfig();

        return {
            getTagsFormat: getTagsFormat,
            getCommitConf: getCommitConf,
            getProperty: getProperty
        };

        ////////////////

        function initConfig() {
            //check if there a .turbocommit config file, otherwise use the default TC conf
        }

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
                throw new Error('Undefined Property');
            }
            return self.config[prop];
        }
    })(configJson);
};
