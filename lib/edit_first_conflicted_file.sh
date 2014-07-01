#!/bin/bash

vim `git status --short | egrep "^UU " | awk '{ print $2 }' | head -n 1`
