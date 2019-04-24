#!/bin/bash

while :; do
    arr0=('#' '#' '#' '#' '#'  '#' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '#')
    arr1=('#' '#' '#' '#' '#' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.'   '#' '#')
    arr2=('#' '#' '#' '#' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.'  '#' '#' '#')
    arr3=('#' '#' '#' '#' '#' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.'   '#' '#')

    arr4=('#' '#' '#' '#' '#'  '#' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '#')

   len=${#arr0[@]}-2
   for (( i=len,j=0; j<10; i=i-2,j++ ))
    do
        clear
        char=' '

        unset 'arr0[i]'
        unset 'arr0[i-1]'       
        arr0="$char${arr0}"
        printf '%s' "${arr0[@]}"
        printf '\n'  

	unset 'arr1[i-1]'
        unset 'arr1[i-2]'       
        arr1="$char${arr1}"
        printf '%s' "${arr1[@]}"
        printf '\n'

	unset 'arr2[i-2]'
        unset 'arr2[i-3]'       
        arr2="$char${arr2}"
        printf '%s' "${arr2[@]}"
        printf '\n'

	unset 'arr3[i-1]'
        unset 'arr3[i-2]'       
        arr3="$char${arr3}"
        printf '%s' "${arr3[@]}"
        printf '\n'

	unset 'arr4[i]'
        unset 'arr4[i-1]'       
        arr4="$char${arr4}"
        printf '%s' "${arr4[@]}"
        printf '\n'

        sleep 0.3
    done

done


