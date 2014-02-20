# [koodikoulu.fi][]

This is the repository for [koodikoulu.fi][] site content.


Contributing
------------

You can report issues and requests on [GitHub Issues][gh_issues].

Also [pull requests][gh_pr_help] are very welcome!


Updating production server
--------------------------

  - Ask needed permissions from Reaktor's administrators

  - Add (once) production serves as a remote called _prod_:

        git remote add prod gopher.dmz.reaktor.fi:/usr/local/git/koodikoulu.git

  - Commit and/or merge changes to the local master branch

  - Push to the central repository and production:

        git push origin master
        git push prod master


License
-------

Copyright © 2014, [Reaktor Innovations Oy](http://reaktor.fi/)

All rights reserved.

[gh_issues]: https://github.com/reaktor/koodikoulu.fi/issues
[gh_pr_help]: https://help.github.com/articles/using-pull-requests
[koodikoulu.fi]: http://koodikoulu.fi/
