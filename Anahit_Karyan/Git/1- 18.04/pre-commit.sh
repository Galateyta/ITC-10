#!/bin/bash

alias script='find . -type f -name "*.sh" | xargs git diff --cached --name-only $against'
if [ -n "$(script)" ]; then
  if script | xargs grep -filename -n "This is a script"; then
    echo "Error commiting"
    exit 1
  fi
fi
