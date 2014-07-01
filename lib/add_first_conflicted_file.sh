#!/bin/bash

git status --short | egrep "^UU " | awk '{ print $2 }' | head -n 1 | egrep '^<<<<' > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "Conflict not resolved"
else
  git add `git status --short | egrep "^UU " | awk '{ print $2 }' | head -n 1`
fi

