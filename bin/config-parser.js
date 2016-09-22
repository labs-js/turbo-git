#!/usr/bin/env node
var configJson = require('./config.json');

module.exports = (function (configJson) {
    'use strict';
    var self = {};

    self.config = configJson;
    self.commits = getProperty('commits');

    return {
        getTagsFormat: getTagsFormat,
        getCommitConf: getCommitConf,
        getProperty: getProperty
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
        if (!self.config[prop]) {
            throw new Error('Undefined Property');
        }
        return self.config[prop];
    }
})(configJson);
