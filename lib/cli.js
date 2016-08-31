#!/usr/bin/env node
var program = require('commander'),
    turboCommit = require('../bin/turboCommit');
program
    .version('0.3.0')
    .usage('"commit message"')
    .command('tc', 'for make a Turbo Commit')
    .arguments('<commitMessage>')
    .action(turboCommit).parse(process.argv);
