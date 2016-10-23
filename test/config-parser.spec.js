#!/usr/bin/env node
var mockConfig = require('./mock.config.json'),
    configParser = require('./../bin/config-parser')(mockConfig),
    defaultConf = require('./../bin/config.json'),
    shell = require('shelljs'),
    helpers = require('./helpers');

describe('config_parse.js', function () {
    'use strict';

    beforeEach(function () {
        configParser = require('./../bin/config-parser')(mockConfig);
    });

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
            expect(configParser.getProperty('commitConvention').length).toBeGreaterThan(0);
        });
        xit('should throw error without params', function () {
            expect(function() {
                configParser.getProperty();
            }).toThrow(new Error('Undefined Property'));
        });
        xit('should throw error with an unknown property', function () {
            expect(function() {
                configParser.getProperty('hola-test');
            }).toThrow(new Error('Undefined Property'));
        });
        it('should return result with a property that It has boolean value', function () {
            expect(configParser.getProperty('debug')).toBe(false);
        });
    });

    describe('init:', function () {
        it('should read the default conf without .turbocommit', function () {
            configParser = require('./../bin/config-parser')();
            expect(configParser.getProperty('commitConvention')).toEqual(defaultConf.commitConvention);
        });

        it('should read the config for the .turbocommit file if exists', function () {
            helpers.gitInitInTempFolder();
            shell.cat('../test/mock.config.json').to('.turbocommit');
            configParser = require('./../bin/config-parser')();
            expect(configParser.getCommitConf()).toEqual(mockConfig.commitConvention);
            helpers.finishTemp();
        });
        // it('should call to init conf command if there is not .turbocommit file', function () {
        //     expect(false).toBe(true);
        // });
    });
});
