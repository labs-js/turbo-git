#!/usr/bin/env node
var shell = require('shelljs');

module.exports = (function () {
    'use strict';
    var mockProcess;

    mockProcess = { exit: function () {} };

    return {
        gitInitInTempFolder:gitInitInTempFolder,
        finishTemp: finishTemp,
        mockProcess: mockProcess
    };

    ///////////////

    function gitInitInTempFolder () {
        shell.rm('-rf', 'tmp');
        shell.config.silent = true;
        shell.mkdir('tmp');
        shell.cd('tmp');
        shell.exec('git init');
    }

    function finishTemp () {
        shell.cd('../');
        shell.rm('-rf', 'tmp');
    }
})();
