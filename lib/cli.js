#!/usr/bin/env node
var program = require('commander');

require('colors');

//Define commands here
program
    .version('0.3.0')
    .command('commit [msg]', 'do a turbo commit')
    .parse(process.argv);
