#!/usr/bin/env node
var consoleMock = require('console-mock'),
    console = consoleMock.create(),
    utils = require('./../bin/utils')(console),
    childProcess = require('child_process'),
    shell = require('shelljs'),
    helpers = require('./helpers');

require('colors');


consoleMock.enabled(false);//disable console.log prints


describe('utils.js', function () {
    'use strict';

    describe('should have defined', function () {
        it('checkGitRepoExistence', function () {
            expect(utils.checkGitRepoExistence).toBeDefined();
        });
        it('showError', function () {
            expect(utils.showError).toBeDefined();
        });
        it('getGitRepoMainPath', function () {
            expect(utils.getGitRepoMainPath).toBeDefined();
        });
    });
    describe('behavior', function () {
        describe('showError', function () {
            beforeEach( function () {
                // consoleMock.enabled(true);
                // consoleMock.historyClear();
                spyOn(console, 'log');
                spyOn(childProcess, 'exec');
            });

            it('should return a undefined', function () {
                expect(utils.showError()).toBeUndefined();
            });
            it('should call console.log', function () {
                utils.showError();
                expect(console.log).toHaveBeenCalled();
            });
            it('should call console.log with error without params', function () {
                utils.showError();
                expect(console.log).toHaveBeenCalledWith('error'.magenta);
            });
            it('should call console.log with the param passed', function () {
                utils.showError('hola');
                expect(console.log).toHaveBeenCalledWith('hola'.magenta);
            });
        });
        describe('checkGitRepoExistence', function () {
            beforeEach( function() {
                spyOn(childProcess, 'exec').andCallThrough();
            });
            it('should return a promise obj', function () {
                expect(typeof utils.checkGitRepoExistence()).toBe('object');
            });
            it('should have a then method', function () {
                expect(utils.checkGitRepoExistence().then).toBeDefined();
            });
            it('should have a catch method', function () {
                expect(utils.checkGitRepoExistence().catch).toBeDefined();
            });
            it('should run chilProcess exec command', function () {
                utils.checkGitRepoExistence();
                expect(childProcess.exec).toHaveBeenCalled();
            });

            it('should execute a git branch command', function () {
                utils.checkGitRepoExistence();
                expect(childProcess.exec).toHaveBeenCalledWith('git branch');
            });

            describe('tests with a real git repo:', function () {
                it('should resolve the promise with a git repo init', function (done) {
                    helpers.gitInitInTempFolder();
                    utils.checkGitRepoExistence().then(function () {
                        helpers.finishTemp();
                        done();
                    });
                });
                it('should reject the promise without a git repo and return a error string', function (done) {
                    helpers.finishTemp();
                    shell.cd('../'); //there is no repo here I guess
                    utils.checkGitRepoExistence().catch(function (data) {
                        expect(typeof data).toBe('string');
                        done();
                    });
                });
            });
        });
        describe('getGitRepoMainPath', function () {
            xit('should trow an error without repo', function () {
                expect(function() {
                    utils.getGitRepoMainPath();
                }).toThrow();
            });
            it('should return a string path inside of git repo', function () {
                helpers.gitInitInTempFolder();
                expect(typeof utils.getGitRepoMainPath()).toBe('string');
                helpers.finishTemp();
            });
        });
    });
});
