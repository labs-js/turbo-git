#!/usr/bin/env node
var consoleMock = require('console-mock'),
    console = consoleMock.create(),
    utils = require('./utils')(console),
    childProcess = require('child_process');

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
    });
    describe('behavior', function () {
        beforeEach( function () {
            // consoleMock.enabled(false);
            // consoleMock.historyClear();
            spyOn(console, 'log');
            spyOn(childProcess, 'exec');
        });

        describe('showError', function () {
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
            it('should return a promise obj', function () {
                expect(typeof utils.checkGitRepoExistence()).toBe('object');
            });
            it('should have a then method', function () {
                expect(utils.checkGitRepoExistence().then).toBeDefined();
            });
            it('should have a catch method', function () {
                expect(utils.checkGitRepoExistence().catch).toBeDefined();
            });
            it('should execute a command', function () {
                utils.checkGitRepoExistence();
                expect(childProcess.exec).toHaveBeenCalled();
            });

            it('should execute a git branch command', function () {
                utils.checkGitRepoExistence();
                expect(childProcess.exec).toHaveBeenCalledWith('git branch');
            });
        });
    });
});
