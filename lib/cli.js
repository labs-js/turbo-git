#!/usr/bin/env node
var program = require('commander');
require('colors');

//Define commands here
program
    .command('commit', 'tc commit "commit message"'.green)
    .parse(process.argv);
