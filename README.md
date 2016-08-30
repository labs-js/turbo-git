[![Build Status](https://travis-ci.org/labs-js/turbo-commit.svg?)](https://travis-ci.org/labs-js/turbo-commit)
[![bitHound Overall Score](https://www.bithound.io/github/labs-js/turbo-commit/badges/score.svg)](https://www.bithound.io/github/labs-js/turbo-commit)

# Turbo Commit CLI
CLI tool for use the [turbo-commit](/CONVENTION.md) convention easily.



If you're a **turbo-developer**, you'll enjoy using a convention for commits on your projects that ensure readability and understanding. 


Furthermore, wouldn't be great to have a tool so every team member follows the same convention?

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

## Coming soon 
 - After finishing the commit command we'll work on new **turbo-commands** that will make magic.
