#!/usr/bin/env node
(function(){
    'use strict';
    
    var Add = require('./commands/add');
    var addCommand = new Add();
    addCommand.init();
})();

