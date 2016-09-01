#!/usr/bin/env node
var program = require('commander'),
    pkg     = require('../package.json'),
    version = pkg.version;

require('colors');

//Define commands here
program
    .version(version)
    .command('commit <msg>', 'do a turbo commit')
    .command('log [limit]', 'show the turbo log')
    .parse(process.argv);

if (!program.args.length) { program.help(); }
