#!/usr/bin/env node
var shell = require('shelljs');

module.exports = (function () {
    'use strict';

    return {
        gitInitInTempFolder:gitInitInTempFolder,
        finishTemp: finishTemp
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
