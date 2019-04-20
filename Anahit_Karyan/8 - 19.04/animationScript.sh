#!/bin/bash

while :; do
    arr=('>' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.'  '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.'   '<')

    for (( i=${#arr[@]}-2; i>0; i=i-2 ))
    do
        clear
        char=' '
        unset 'arr[i]'
        unset 'arr[i-1]'       
        arr="$char${arr}"
        printf '%s' "${arr[@]}"
        printf '\n'  
        sleep 0.3
    done
done


