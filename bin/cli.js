#!/usr/bin/env node
var program = require('commander'),
    pkg     = require('../package.json'),
    version = pkg.version;

require('colors');

program
    .version(version)
    .command('commit', 'execute a turbo commit')
    .command('log', 'show turbo log')
    .command('add', 'add files to commit')
    .parse(process.argv);
