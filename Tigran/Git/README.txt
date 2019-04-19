commit-msg_hook.txt is example of git hook.

It validate commit message. If commit message is not validated hook does not allow to make commit.

Commit message must:
- be more then 3 characters
- start with " - "
- not end with "."

For activate this hook place "commit-msg_hook.txt" in ".git/hooks/" directory and rename to "commit-msg"
