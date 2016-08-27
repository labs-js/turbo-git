# Turbo Commit

A simple and powerful convention for our Git commits.

*Main idea: All the commits that we do in the repo must have a TAG in the title message.* 

This will make us git logs something nicer and easier to see. Some extra magic comes after it with the `tc` **CLI** (work in progress)


# Example:
    
    [ADD] component: saraza #issue-number
      - This component is in change of do Foo 
      - Also we care about Baz


## Titles:

> We must add the tags on the beginning of the commit title, the max length for the entirety title is: *50 characters*

> All the possible tags has only 3 letter on uppercase between Brackets

     [ADD] : features commits, adding lines of code.
     [DEL] : removing lines of code, code cleanup, remove old lib,unused assets, etc.
     [MOD] : modifying the way of do something, tiny changes
     [FIX] : bugfixing commits
     [REF] : commits part of a refactor
     [BRK] : breaking change commits

> Why only 3 letter?

> 1. This is the best way to keep it simple, and nice to see in the git log
> 2. It will be easier do some search by tag, write some nice regex, etc.


>Also the idea is if you are using any issue tracker add the issue at the end of the title something like `#issue-23`*


## Description

> The description It's optional, sometimes is necessary sometimes it's not. The max length for our description is: *72 characters*
> After write the title do an enter.. and the description start. It's nicer write in bullet points so we use `-` for it.

      - This component is in change of do Foo 
      - Also we care about Baz
