#!/usr/bin/env node
var program = require('commander'),
    pkg     = require('../package.json'),
    version = pkg.version;

require('colors');

program
    .version(version)
    .command('commit <msg>', 'execute a turbo commit')
    .command('log [limit]', 'show turbo log')
    .parse(process.argv);
