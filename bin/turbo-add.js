#!/usr/bin/env node
(function(){
    'use strict';
    var Add = require('./../lib/commands/add'),
        addCommand = new Add();

    require('./../lib/config/config-parser')();

    addCommand.init();
})();
