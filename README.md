cd .git/hooks
touch pre-commit

My pre-commit hook will look for a ‘TODO’ string in your commit.
If it finds one, the commit will be rejected.
