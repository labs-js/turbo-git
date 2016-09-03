#!/usr/bin/env node
var program = require('commander'),
    pkg     = require('../package.json'),
    version = pkg.version;

require('colors');

program
    .version(version)
    .command('commit', 'start doing a turbo commit')
    .command('log', 'show turbo log')
    .parse(process.argv);
