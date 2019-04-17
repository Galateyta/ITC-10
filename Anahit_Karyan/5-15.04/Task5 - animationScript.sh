#!/bin/bash

a0=('*' '*' '*' '*' '*' '*' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '*')
a1=('*' '*' '*' '*' '*' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '*' '*')
a2=('*' '*' '*' '*' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '*' '*' '*')
a3=('*' '*' '*' '*' '*' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '*' '*')
a4=('*' '*' '*' '*' '*' '*' '.' '.' '.' '.' '.' '.' '.' '.' '.' '.' '*')

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
  array=(pluto pippo)
 delete=(pluto)
 echo ${array[@]/$delete}
 array=( "${array[@]/$delete}" )
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



