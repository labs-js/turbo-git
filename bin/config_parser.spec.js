#!/usr/bin/env node
var configParser = require('./config_parser');


describe('config_parse', function () {
    'use strict';
    describe('should have defined:', function () {
        it('getTagsFormat', function () {
            expect(configParser.getTagsFormat);
        });
        it('getCommitConfBy', function () {
            expect(configParser.getCommitConfBy);
        });
    });
});
