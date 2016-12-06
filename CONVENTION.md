# Turbo Commit Convention

### A simple and powerful convention for our Git commits.

*Main idea: Every commit done should have a TAG inside the title message.*

This will create git logs nicer and easier to see. Some extra magic comes after it with the [Turbo Git CLI](/README.md)


# Example:
    
    [ADD] component: my change #issue-number
         - This component is in change of do Foo 
         - Also we care about Baz
         - [ADD] some new file


## Titles:

> We must add tags at the beginning of the commit title, the max length for the entirety title is: *50 characters*

> Each possible tag has only 3 uppercase letters between Brackets

     [ADD] : features commits, adding lines of code.
     [FIX] : bugfixing commits.
     [MOD] : change commits, tiny changes, modifying the way of do something.
     [DEL] : deleting commits, code cleanup, remove old libs, deleting files.
     [REF] : refactor commits, part of a refactor, big changes.
     [BRK] : breaking changes commits, when we break old APIs.

> Why only 3 letter?

> 1. Best way to keep it simple and nice to see in git log
> 2. It will be easier to do some search by tag, write some nice regex, It looks better in this way, etc.


>Furthermore, if you are using any issue tracker add the issue at the end of the title something like `#issue-23`*


## Description

> The description It's optional, sometimes is necessary sometimes it's not. The max length for our description is: *72 characters*
> After writing the title press enter.. and the description start. It's nicer to write with bullet points so we use `-` for it. Also we can re use the tags for the titles

      - This component is in change of do Foo 
      - Also we care about Baz
      - [ADD] some new file
