#!/usr/bin/env node
var program = require('commander'),
    pkg     = require('../package.json'),
    version = pkg.version;

program
    .version(version)
    .command('commit', 'from git: `git tc`, execute a turbo commit using a convention.')
    .command('log', 'from git: `git tl`, show turbo log, colors with real meaning.')
    .command('add', 'from git: `git ta`, utility for execute a git add is a easier way.')
    .parse(process.argv);
