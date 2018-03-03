#!/usr/bin/env node
var program = require('commander'),
    pkg     = require('../package.json'),
    version = pkg.version;

program
    .version(version)
    .command('add', 'from git: `git ta`, utility for execute a git add is a easier way.')
    .command('commit', 'from git: `git tc`, execute a turbo commit using a convention.')
    .command('diff [options]', 'from git: `git td`, execute a better diff (diff-so-fancy).')
    .command('log', 'from git: `git tl`, show turbo log, colors with real meaning.')
    .command('init', 'from git: `git ti`, set a commit convention for a git repository.')
    .parse(process.argv);
