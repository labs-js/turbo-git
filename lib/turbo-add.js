#!/usr/bin/env node
(function(){
    'use strict';
    var Add = require('./commands/add'),
        addCommand = new Add();

    require('../bin/config-parser')();

    addCommand.init();
})();

