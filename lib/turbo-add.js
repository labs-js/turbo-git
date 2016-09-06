#!/usr/bin/env node
(function(){
    'use strict';

    var childProcess = require('child_process'),
        inquirer = require('inquirer'),
        configParser = require('../bin/config-parser'),
        messageHandler = require('../bin/message-handler');


    init();

    function init(){
        // git status --porcelain | sed s/^...//
        var gitStatusPorcelain = childProcess.exec('git status --porcelain | sed s/^...//');
        gitStatusPorcelain.stdout.on('data',function(data){
            var files = data.split('\n');
        });

    }

})();