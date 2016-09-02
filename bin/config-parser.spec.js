#!/usr/bin/env node
var configParser = require('./config-parser');

describe('config_parse.js', function () {
    'use strict';
    describe('should have defined:', function () {
        it('getTagsFormat', function () {
            expect(configParser.getTagsFormat);
        });
        it('getCommitConfBy', function () {
            expect(configParser.getCommitConfBy);
        });
    });
    describe('getTagsFormat:', function () {
        it('should return an array with elements', function () {
            expect(configParser.getTagsFormat().length).toBeGreaterThan(0);
        });
    });
    describe('getCommitConfBy:', function () {
        it('should return an empty array without arguments', function () {
            expect(configParser.getCommitConfBy().length).toBe(0);
        });
        it('should return results with a correct parameter type', function () {
            expect(configParser.getCommitConfBy('tag').length).toBeGreaterThan(0);
        });
    });
});
