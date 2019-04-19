commit-msg_hook.txt is an example of git hook.

It validate commit message. If commit message is not validated hook does not allow to make commit.

Commit message must:
- be more then 3 characters
- start with " - "
- not end with "."

To activate this hook place "./commit-msg_hook.txt" in "%REPO%/.git/hooks/" directory and rename to "commit-msg"
-------------------------------------------------------------------------------
post-commit is a git hook for displaying an animation when commmit is made.

For terminating the animation press Ctrl + C 

To activate this hook place "./post-commit" in "%REPO%/.git/hooks/" 
