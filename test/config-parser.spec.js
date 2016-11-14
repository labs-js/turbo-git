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
        it('getLogCommand', function () {
            expect(configParser.getLogCommand);
        });
        it('getCommitPromptTex', function () {
            expect(configParser.getCommitPromptText);
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

    describe('getLogCommand:', function () {
        it('should return a string with a command', function () {
            expect(typeof configParser.getLogCommand()).toBe('string');
        });
    });

    describe('getCommitPromptText:', function () {
        it('should return false without params', function () {
            expect(configParser.getCommitPromptText()).toBeFalsy();
        });
        it('should return false with an unknown prop parameter', function () {
            expect(configParser.getCommitPromptText('prop212321')).toBeFalsy();
        });
        it('should return false if the prop is set on "" in the conf', function () {
            mockConfig.turboCommit.textAskDesc = '';
            configParser = require('./../bin/config-parser')(mockConfig);
            expect(configParser.getCommitPromptText('desc')).toBeFalsy();
        });
        it('should return false if the prop is set on false in the conf', function () {
            mockConfig.turboCommit.textAskDesc = false;
            configParser = require('./../bin/config-parser')(mockConfig);
            expect(configParser.getCommitPromptText('desc')).toBeFalsy();
        });
        it('should return false if the prop is set on 0 in the conf', function () {
            mockConfig.turboCommit.textAskDesc = 0;
            configParser = require('./../bin/config-parser')(mockConfig);
            expect(configParser.getCommitPromptText('desc')).toBeFalsy();
        });
        it('should retun the string with the right value', function () {
            mockConfig.turboCommit.textAskDesc = 'description here';
            configParser = require('./../bin/config-parser')(mockConfig);
            expect(configParser.getCommitPromptText('desc')).toBe('description here');
        });
    });

    describe('getProperty:', function () {
        beforeEach(function () {
            spyOn(helpers.mockProcess,'exit');
            configParser = require('./../bin/config-parser')(mockConfig, helpers.mockProcess);
        });

        it('should return results with right param', function () {
            expect(typeof configParser.getProperty('commitConvention')).toBe('object');
        });
        it('should call process.exit(1) without params', function () {
            configParser.getProperty();
            expect(helpers.mockProcess.exit).toHaveBeenCalledWith(1);
        });
        it('should call process.exit(1) with an unknown property', function () {
            configParser.getProperty('hola-test');
            expect(helpers.mockProcess.exit).toHaveBeenCalledWith(1);
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
            expect(configParser.getCommitConf()).toEqual(mockConfig.commitConvention.commitDesc);
            helpers.finishTemp();
        });
        // it('should call to init conf command if there is not .turbocommit file', function () {
        //     expect(false).toBe(true);
        // });
    });
});
