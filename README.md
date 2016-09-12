[![Build Status](https://travis-ci.org/labs-js/turbo-commit.svg?)](https://travis-ci.org/labs-js/turbo-commit)
[![Coverage Status](https://coveralls.io/repos/github/labs-js/turbo-commit/badge.svg?branch=develop)](https://coveralls.io/github/labs-js/turbo-commit?branch=test-coverage)
[![Code Climate](https://codeclimate.com/github/labs-js/turbo-commit/badges/gpa.svg)](https://codeclimate.com/github/labs-js/turbo-commit)
[![Turbo Commit](https://img.shields.io/badge/Turbo_Commit-on-3DD1F2.svg)](https://github.com/labs-js/turbo-commit/blob/master/CONVENTION.md)
[![npm](https://img.shields.io/npm/v/turbo-commit.svg?style=flat)](https://www.npmjs.com/package/turbo-commit)
[![bitHound](https://www.bithound.io/github/labs-js/turbo-commit/badges/score.svg)](https://www.bithound.io/github/labs-js/turbo-commit) [![codecov](https://codecov.io/gh/labs-js/turbo-commit/branch/develop/graph/badge.svg)](https://codecov.io/gh/labs-js/turbo-commit)

[![gitter](https://img.shields.io/gitter/room/turbo-commit/turbo-commit.svg?style=flat)](https://gitter.im/turbo-commit/Lobby)


# Turbo Commit CLI

CLI tool originally thought for implement the [turbo-commit](/CONVENTION.md) convention easily. Now It's more than that.. It's also a nice tuning for git commands out of the box.

If you're a **turbo-developer**, you'll enjoy using a convention for GIT on your projects that ensure readability and understanding. You can also make a great improvement about how use git in the command line day by day. 
Wouldn't be great have a tool that make easier implement all of this?

## Demo
<img src="assets/demo.gif" width="600"/>


## Install

    npm install -g turbo-commit


then you're able to use the `turbo` command or in the git form `git turbo <command>`

## How to use

All the turbo command will be available from the turbo command and from git also. So you will able to do `turbo command` and `git turbo command` as well.


> First, execute `turbo add` you will be prompt with the follow:

<img src="assets/prompt-turbo-add.png" alt="prompt-turbo-add.png" width="200"/>

Select want you want to add moving with the arrow key and pressing space.. then enter. 

> Now you are able to commit using `turbo commit` command as follows:

    turbo commit

After that, you'll see the possible tags for your turbo-commits:

<img src="assets/prompt-tag-preview.png" alt="prompt-tag-screnshoot" width="600"/>

Choose your tag to wrap your commit message, press enter.

Now insert your commit title and the description if you want and you're done.

Congrats! You did your first turbo-commit.

Now, you can see it in your with the corresponding commit color`turbo log`

<img src="assets/prompt-turbo-log.png" alt="prompt-tag-screnshoot" width="400"/>

## Coming soon 

 - we'll continue work on new **turbo-commands** that will add some extra magic.

- We are thinking in implement other commit conventions and  let you write your own conventions in a easy way.

## Badge

Be proud like us that you are using Turbo Commit, add the Badge to your projects.

<a href="https://github.com/labs-js/turbo-commit/blob/master/README.md"><img src="https://img.shields.io/badge/Turbo_Commit-on-3DD1F2.svg" alt="Turbo Commit: On"/></a>

Markdown
    
    [![Turbo Commit](https://img.shields.io/badge/Turbo_Commit-on-3DD1F2.svg)](https://github.com/labs-js/turbo-commit/blob/master/README.md)

Html

    <a href="https://github.com/labs-js/turbo-commit/blob/master/README.md"><img src="https://img.shields.io/badge/Turbo_Commit-on-3DD1F2.svg" alt="Turbo Commit: On"/></a>
