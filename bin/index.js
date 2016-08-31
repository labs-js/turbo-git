#!/usr/bin/env node
var program = require('commander');
require('colors');

program
    .command('commit', 'tc commit "commit message"'.green)
    .parse(process.argv);
