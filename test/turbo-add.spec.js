#!/usr/bin/env node
var consoleMock = require('console-mock'),
    consoleTest = consoleMock.create(),
    TurboAdd = require('../lib/commands/add'),
    childProcess = require('child_process'),
    add;

xdescribe('turbo-add', function () {
    'use strict';

    beforeEach(function () {

        add = new TurboAdd();
        console.log(add);
    });

    it('init', function () {
        var gitPorcelainOutput = '?? file1.js \n?? file2.js';

        var getNoStagedFilesValue = ['file1.js', 'file2.js'];

        spyOn(childProcess, "exec").andReturn(gitPorcelainOutput);

        //spyOn("getNoStagedFiles").andReturn(getNoStagedFilesValue);

        add.init();

        // spyOn('promptFileSelection').toHaveBeenCalledWith(getNoStagedFilesValue);
    });
});

