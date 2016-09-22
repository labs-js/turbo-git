#!/usr/bin/env node
var configParser = require('./config-parser');

//TODO: implement a mock config.json

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
        it('should throw error without params', function () {
            expect(function() {
                configParser.getProperty();
            }).toThrow(new Error('Undefined Property'));
        });
        it('should throw error with an unknown property', function () {
            expect(function() {
                configParser.getProperty('hola-test');
            }).toThrow(new Error('Undefined Property'));
        });
        it('should return result with a property that It has boolean value', function () {
            //TODO: this sould be dode with mock data.
            expect(configParser.getProperty('debug')).toBe(false);
        });
    });
});
