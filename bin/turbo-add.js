#!/usr/bin/env node
(function() {
    'use strict';
    var Add = require('turbo-git-add'),
        addCommand = new Add();

    require('turbo-git-config').parse;

    addCommand.init();
})();
