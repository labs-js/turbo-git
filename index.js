#!/usr/bin/env node
var program = require('commander');
const exec = require('child_process').exec;

program
    .arguments('<commitMessage>')
    .action(function (commitMessage) {
        console.log('commitMessage: %s', commitMessage);

        exec('git commit -m "' + commitMessage + '"', (error, stdout, stderr) => {
            if (error) {
                console.error('exec error: ${error}');
                return;
            }
            console.log('stdout: ${stdout}');
            console.log('stderr: ${stderr}');
        });
    }).parse(process.argv);

//tc hola
//git commit -m "hola"