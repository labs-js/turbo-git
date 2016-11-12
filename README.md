[![Build Status](https://travis-ci.org/labs-js/turbo-commit.svg?)](https://travis-ci.org/labs-js/turbo-commit)
[![Code Climate](https://codeclimate.com/github/labs-js/turbo-commit/badges/gpa.svg)](https://codeclimate.com/github/labs-js/turbo-commit)
[![Turbo Commit](https://img.shields.io/badge/Turbo_Commit-on-3DD1F2.svg)](https://github.com/labs-js/turbo-commit/blob/master/CONVENTION.md)
[![npm](https://img.shields.io/npm/v/turbo-commit.svg?style=flat)](https://www.npmjs.com/package/turbo-commit)
[![bitHound](https://www.bithound.io/github/labs-js/turbo-commit/badges/score.svg)](https://www.bithound.io/github/labs-js/turbo-commit) [![codecov](https://codecov.io/gh/labs-js/turbo-commit/branch/develop/graph/badge.svg)](https://codecov.io/gh/labs-js/turbo-commit)

[![gitter](https://img.shields.io/gitter/room/turbo-commit/turbo-commit.svg?style=flat)](https://gitter.im/turbo-commit/Lobby)


# Turbo Commit CLI

This CLI tool was originally thought for implementing the [turbo-commit](/CONVENTION.md) convention easily. Now It's more than that.. You can use it with any other commit convention (aviable soon). And it's also good for tuning out of the box git commands.

If you enjoy the good quality software and you work for have it, You'll enjoy using a commit convention on your projects that ensures readability and understanding. For sure you can also make some great improvements on how you use git in the command line everyday.
Wouldn't it be great to have a tool that ensure all of this for you and for your team?

## Install

    npm install -g turbo-commit

Then you're able to use the `turbo` command. From git: `git turbo <command>` or with the git alias: 'git tc','git tl' and 'git ta'


## Demo (outdate, now this is even better)
<img src="assets/demo.gif" width="600"/>



## How to use

All the turbo commands will also be available in git. So you will able to do `turbo command`, `git turbo command` or with the git alias as well.

> First, add someting to commit you can use `git add` or our `turbo add` as well.. If you choose use the *turbo add* you will be prompted with the following:

<img src="assets/prompt-turbo-add.png" alt="prompt-turbo-add.png" width="200"/>

Select what you want to add by moving with the arrow key and pressing space.. then enter. (This will be improve it soon, with a better UX)

> Now you are able to commit using `turbo commit` or `git tc` command as follows:

    turbo commit

After that, you'll see the possible tags for your turbo-commits:

<img src="assets/prompt-tag-preview.png" alt="prompt-tag-screnshoot" width="600"/>

>Choose your tag to wrap your commit message, press enter.
>Now insert your commit title and the description, if you want, and you're done.

Congrats! You did your first turbo-commit.

Now, you can see it in your `turbo log` or `git tl` with the corresponding commit color.

<img src="assets/prompt-turbo-log.png" alt="prompt-tag-screnshoot" width="400"/>

## Coming soon

- Improvements in the existing turbo commands adding functionalitty and a beter UX.

- We are working on implementing other commit conventions by a file configuration. You will able to use a convention per repository. And also you will able to write your own convention easily.

- We'll continue working on new **turbo-commands** that will add some extra magic, any idea/help is welcome.

## Badge

Be proud like we are, that you are using Turbo Commit CLI.. add the Badge to your projects.

<a href="https://github.com/labs-js/turbo-commit/blob/master/README.md"><img src="https://img.shields.io/badge/Turbo_Commit-on-3DD1F2.svg" alt="Turbo Commit: On"/></a>

Markdown

    [![Turbo Commit](https://img.shields.io/badge/Turbo_Commit-on-3DD1F2.svg)](https://github.com/labs-js/turbo-commit/blob/master/README.md)

Html

    <a href="https://github.com/labs-js/turbo-commit/blob/master/README.md"><img src="https://img.shields.io/badge/Turbo_Commit-on-3DD1F2.svg" alt="Turbo Commit: On"/></a>
