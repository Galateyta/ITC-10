#!/bin/bash

while :; do

    a0=('*' '*' '*' '*' '*' '*' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '*')
    a1=('*' '*' '*' '*' '*' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '*' '*')
    a2=('*' '*' '*' '*' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '*' '*' '*')
    a3=('*' '*' '*' '*' '*' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '*' '*')
    a4=('*' '*' '*' '*' '*' '*' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '*')
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




printMatrix() {
    printArr "${a0[@]}"
    printArr "${a1[@]}"
    printArr "${a2[@]}"
    printArr "${a3[@]}"
    printArr "${a4[@]}"
}

printArr() {
    arr=("$@")
    printf '%s' "${arr[@]}"
    printf '\n'
}

changeArr() {

}


printArr "${a0[@]}"
printArr "${a1[@]}"
printArr "${a2[@]}"
printArr "${a3[@]}"
printArr "${a4[@]}"

# ${a5[@]}
#printMatrix $a0 $a1 $a2 $a3 $a5
#echo ${a0[*]}
#printf '%s' "${a0[@]}"

#echo ${a0[0]}



