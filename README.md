[![Build Status](https://travis-ci.org/labs-js/turbo-commit.svg?)](https://travis-ci.org/labs-js/turbo-commit)
[![Coverage Status](https://coveralls.io/repos/github/labs-js/turbo-commit/badge.svg?branch=develop)](https://coveralls.io/github/labs-js/turbo-commit?branch=test-coverage)
[![Code Climate](https://codeclimate.com/github/labs-js/turbo-commit/badges/gpa.svg)](https://codeclimate.com/github/labs-js/turbo-commit)
[![Turbo Commit](https://img.shields.io/badge/Turbo_Commit-on-3DD1F2.svg)](https://github.com/labs-js/turbo-commit/blob/master/CONVENTION.md)
[![npm](https://img.shields.io/npm/v/turbo-commit.svg?style=flat)](https://www.npmjs.com/package/turbo-commit)
[![bitHound](https://www.bithound.io/github/labs-js/turbo-commit/badges/score.svg)](https://www.bithound.io/github/labs-js/turbo-commit) [![codecov](https://codecov.io/gh/labs-js/turbo-commit/branch/develop/graph/badge.svg)](https://codecov.io/gh/labs-js/turbo-commit)

[![gitter](https://img.shields.io/gitter/room/turbo-commit/turbo-commit.svg?style=flat)](https://gitter.im/turbo-commit/Lobby)


# Turbo Commit CLI

This CLI tool was originally thought for implementing the [turbo-commit](/CONVENTION.md) convention easily. Now It's more than that.. It's also good for tuning out of the box git commands.

If you're a **turbo-developer**, you'll enjoy using a convention for GIT on your projects that ensures readability and understanding. You can also make a great improvement on how you use git in the command line everyday. 
Wouldn't it be great to have a tool that makes implementing all of this easier?

## Demo
<img src="assets/demo.gif" width="600"/>


## Install

    npm install -g turbo-commit


Then you're able to use the `turbo` command or in git form `git turbo <command>`

## How to use

All the turbo commands will also be available in git. So you will able to do `turbo command` and `git turbo command` as well.

> First, execute `turbo add` you will be prompted with the following:

<img src="assets/prompt-turbo-add.png" alt="prompt-turbo-add.png" width="200"/>

Select what you want to add by moving with the arrow key and pressing space.. then enter. 

> Now you are able to commit using `turbo commit` command as follows:

    turbo commit

After that, you'll see the possible tags for your turbo-commits:

<img src="assets/prompt-tag-preview.png" alt="prompt-tag-screnshoot" width="600"/>

>Choose your tag to wrap your commit message, press enter.
>Now insert your commit title and the description, if you want, and you're done.

Congrats! You did your first turbo-commit.

Now, you can see it in your `turbo log` with the corresponding commit color.

<img src="assets/prompt-turbo-log.png" alt="prompt-tag-screnshoot" width="400"/>

## Coming soon 

- We'll continue working on new **turbo-commands** that will add some extra magic.

- We are thinking on implementing other commit conventions by a file configuration. So you will able to write your own convention in a easy way.

## Badge

Be proud like we are, that you are using Turbo Commit.. add the Badge to your projects.

<a href="https://github.com/labs-js/turbo-commit/blob/master/README.md"><img src="https://img.shields.io/badge/Turbo_Commit-on-3DD1F2.svg" alt="Turbo Commit: On"/></a>

Markdown
    
    [![Turbo Commit](https://img.shields.io/badge/Turbo_Commit-on-3DD1F2.svg)](https://github.com/labs-js/turbo-commit/blob/master/README.md)

Html

    <a href="https://github.com/labs-js/turbo-commit/blob/master/README.md"><img src="https://img.shields.io/badge/Turbo_Commit-on-3DD1F2.svg" alt="Turbo Commit: On"/></a>
