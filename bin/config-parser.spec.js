#!/usr/bin/env node
var configParser = require('./config-parser');

describe('config_parse.js', function () {
    'use strict';
    describe('should have defined:', function () {
        it('getTagsFormat', function () {
            expect(configParser.getTagsFormat);
        });
        it('getCommitConf', function () {
            expect(configParser.getCommitConf);
        });

        it('getProperty', function () {
            expect(configParser.getProperty);
        });
    });
    describe('getTagsFormat:', function () {
        it('should return an array with elements', function () {
            expect(configParser.getTagsFormat().length).toBeGreaterThan(0);
        });
    });
    describe('getCommitConf:', function () {
        it('should return results', function () {
            expect(configParser.getCommitConf().length).toBeGreaterThan(0);
        });
    });

    describe('getProperty:', function () {
        it('should return results with right param', function () {
            expect(configParser.getProperty('commits').length).toBeGreaterThan(0);
        });
        it('should return results with right param', function () {
            expect(function() {
                configParser.getProperty();
            }).toThrow(new Error('Undefined Property'));
        });
    });
});
