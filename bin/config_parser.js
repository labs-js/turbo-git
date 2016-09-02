#!/usr/bin/env node
var configJson = require('./config.json');

module.exports = (function (configJson) {
    'use strict';
    var self = {};

    self.commits = configJson.commits;

    return {
        getTagsFormat: getTagsFormat,
        getCommitConfBy: getCommitConfBy
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

    function getCommitConfBy(prop) {
        return self.commits.filter(function (obj) {
            return obj[prop];
        });
    }
})(configJson);
