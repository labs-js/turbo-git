#!/usr/bin/env node
var config = {};

config.tags = require('./tags.json');

config.getTagsFormat = function () {
    'use strict';
    var res = [],
        colors = require('colors/safe');

    config.tags.forEach(function (val, i) {
        res.push({
            'name': colors[val.color](val.tag + ' : ' + val.desc),
            'value': val.tag
        });
    });
    return res;
};

module.exports = config;
