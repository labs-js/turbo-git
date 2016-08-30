[![Build Status](https://travis-ci.org/labs-js/turbo-commit.svg?)](https://travis-ci.org/labs-js/turbo-commit)
[![bitHound Overall Score](https://www.bithound.io/github/labs-js/turbo-commit/badges/score.svg)](https://www.bithound.io/github/labs-js/turbo-commit)

# Turbo Commit CLI
CLI tool for use the [turbo-commit](/CONVENTION.md) convention easily.

If you're a turbo-developer, we're sure you always starts your commits messages using tags to clarify what kind of code
you're pushing.

     [ADD] : features commits, adding lines of code.
     [DEL] : removing lines of code, code cleanup, remove old lib,unused assets, etc.
     [MOD] : modifying the way of do something, tiny changes
     [FIX] : bugfixing commits
     [REF] : commits part of a refactor
     [BRK] : breaking change commits

Wouldn't be great to have a tool so every team member follows the same convention?

## Install 

    npm install -g turbo-commit


then you're able to use the `tc` command

## How to use

> First, execute `git add` like you usually do, then commit using `tc` command as follows:

    tc "my commit message"

After that, you'll see the possible tags for your turbo-commits:

<img src="assets/prompt-tag-preview.jpg" alt="prompt-tag-screnshoot" width="600"/>

Choose your tag to wrap your commit message, press enter and you're done.

Congrats! You did your first turbo-commit.

Now, you can see it in your `git log`