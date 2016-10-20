#!/usr/bin/env node
var consoleMock  = require('console-mock'), 
    consoleTest = consoleMock.create(), 
    turboAdd = require('../lib/turbo-add'),
    childProcess = require('child_process');

describe('turbo-add', function(){
    'use strict';

    it('init', function(){
        var gitPorcelainOutput =  '?? file1.js \n?? file2.js';
        var getNoStagedFilesValue = ['file1.js','file2.js'];
        
        spyOn(childProcess, "exec").andReturn(gitPorcelainOutput);

        spyOn("getNoStagedFiles").andReturn(getNoStagedFilesValue);
       
        turboAdd.init(); 
        
        spyOn('promptFileSelection').toHaveBeenCalledWith(getNoStagedFilesValue);
    });
     
});

