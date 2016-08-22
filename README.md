# Turbo Commit

A simple and powerful convention for our Git commits.

*Main idea: All the commits that we do in the repo must have a TAG in the title message.*


## template:


    [TAG] Title of commit
 
    - Description
    - Another description


## Tags for commit titles:

> All the possible tags has only 3 letter on uppercase betweten Brackets

     [ADD] : features commits, adding lines of code.
     [DEL] : removing lines of code, code clean up, remove lib, code, etc.
     [MOD] : modifing the way of do something, tiny changes
     [FIX] : bugfixing commits
     [REF] : commits part of a refactor

> Why only 3 letter?

> 1. This is the best way to keep it simple, and nice to see in the git log
> 2. It will be easier do some search by tag, write some nice regex, etc.


# example:

    [ADD] component: saraza
      - This component is in chage of do Foo 
      - Also we care about Baz