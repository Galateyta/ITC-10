cd .git/hooks
touch pre-commit
 

#!/bin/sh
#
# An example hook script to verify what is about to be committed.
# Called by "git commit" with no arguments.  The hook should
# exit with non-zero status after issuing an appropriate message if
# it wants to stop the commit.
#
# To enable this hook, rename this file to "pre-commit".

if git rev-parse --verify HEAD >/dev/null 2>&1
then
        against=HEAD
else
        # Initial commit: diff against an empty tree object
        against=$(git hash-object -t tree /dev/null)
fi

commit=`git diff --cached $against | grep -e '^\+.*TODO.*$'`
if [ -n $commit ]
then
        echo "Don't commit with TODO"
        exit 1
fi
exit 0


 My pre-commit hook will look for a ‘TODO’ string in your commit.
 If it finds one, the commit will be rejected.