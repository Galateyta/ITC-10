#!/bin/bash


xSide=15
line=50
let h=$xSide/2
let sp=$line-$xSide-1
clear


function draw() {
    sleep 0.1
    clear
    let b=($sp-$1)/2
    
    for ((i=1;i<=$xSide;i++));
    do
        myString=$(printf "%${b}s")
        echo -n "${myString// /' '}"

        if [ $i -le $h ]; then
            let s=${xSide}-$i+1
        else 
            s=$i
        fi
        myString=$(printf "%${s}s")
        echo -n "${myString// /*}"
        
        myString=$(printf "%${j}s")
        echo -n "${myString// /' '}"

        let t=$line-$s-$j-$b*2
        myString=$(printf "%${t}s")
        echo "${myString// /*}"
    done
}


while :
do
    for ((j=$sp;j>=0;j-=2));
    do
        draw $j
    done
    for ((j=0;j<=$sp;j+=2));
    do
        draw $j
    done
    echo "Press 'q' to exit"
    read -n 1 k <&1
    if [[ $k = q ]] ; then
        printf "\nQuitting from the program\n"
        break
    fi
done
