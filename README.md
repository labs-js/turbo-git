# Turbo Commit

A simple and powerful convention for our Git commits.

*Main idea: Every commit done should have a TAG inside the title message.*

This will create git logs nicer and easier to see. Some extra magic comes after it with the `tc` **CLI** (work in progress)


# Example:
    
    [ADD] component: saraza #issue-number
      - This component is in change of do Foo 
      - Also we care about Baz


## Titles:

> We must add tags at the beginning of the commit title, the max length for the entirety title is: *50 characters*

> Each possible tag has only 3 uppercase letters between Brackets

     [ADD] : features commits, adding lines of code.
     [DEL] : removing lines of code, code cleanup, remove old lib,unused assets, etc.
     [MOD] : modifying the way of do something, tiny changes
     [FIX] : bugfixing commits
     [REF] : commits part of a refactor
     [BRK] : breaking change commits

> Why only 3 letter?

> 1. Best way to keep it simple and nice to see in git log
> 2. It will be easier to do some search by tag, or write some nice regex, etc.


>Furthermore, if you are using any issue tracker add the issue at the end of the title something like `#issue-23`*


## Description

> The description It's optional, sometimes is necessary sometimes it's not. The max length for our description is: *72 characters*
> After writing the title press enter.. and the description start. It's nicer to write with bullet points so we use `-` for it.

      - This component is in change of do Foo 
      - Also we care about Baz
