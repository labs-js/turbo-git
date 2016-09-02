#!/usr/bin/env node
var config = {};

config.commits = require('./config.json').commits;

config.getTagsFormat = function () {
    'use strict';
    var res = [],
        colors = require('colors/safe');

    config.commits.forEach(function (val, i) {
        res.push({
            'name': colors[val.color](val.tag + ' : ' + val.desc),
            'value': val.tag
        });
    });
    return res;
};

module.exports = config;
