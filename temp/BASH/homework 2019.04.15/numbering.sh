#!/bin/bash

#run command 
#   - bash numbering.sh <startLineNum> <endLineNum> <fileName>
#   - bash numbering.sh 2 5 a.txt

vim -esc''$1','$2's/^/\=printf("%d. ", line("."))/|x' $3
