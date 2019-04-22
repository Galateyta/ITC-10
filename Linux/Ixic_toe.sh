#!/bin/bash
num1="X"
num2="O"
map=("0" "1" "2" "3" "4" "5" "6" "7" "8")
m1=$1
m2=$2

clear

function print_map {
    echo "Map:"
    echo "${map[0]} | ${map[1]} | ${map[2]}"
    echo "${map[3]} | ${map[4]} | ${map[5]}"
    echo "${map[6]} | ${map[7]} | ${map[8]}"
}

function check {
    #horizontals
        if [[ (${map[0]} == ${map[1]}) && (${map[1]} == ${map[2]}) ]]; then
          if [ ${map[0]} == "$num1" ];then
            echo "$m1 won"
          fi
          if [ ${map[0]} == "$num2" ];then
            echo "$m2 won"
          fi
        exit;  fi
        if [[ (${map[3]} == ${map[4]}) && (${map[4]} == ${map[5]}) ]]; then
          if [ ${map[3]} == "$num1" ];then
            echo "$m1 won"
          fi
          if [ ${map[3]} == "$num2" ];then
            echo "$m2 won"
          fi
        exit;  fi
        if [[ (${map[6]} == ${map[7]}) && (${map[7]} == ${map[8]}) ]]; then
          if [ ${map[6]} == "$num1" ];then
            echo "$m1 won"
          fi
          if [ ${map[6]} == "$num2" ];then
            echo "$m2 won"
          fi
        exit;  fi

    #verticals
        if [[ (${map[0]} == ${map[3]}) && (${map[3]} == ${map[6]}) ]]; then
          if [ ${map[0]} == "$num1" ];then
            echo "$m1 won"
          fi
          if [ ${map[0]} == "$num2" ];then
            echo "$m2 won"
          fi
        exit;  fi
        if [[ (${map[1]} == ${map[4]}) && (${map[4]} == ${map[7]}) ]]; then
          if [ ${map[1]} == "$num1" ];then
            echo "$m1 won"
          fi
          if [ ${map[1]} == "$num2" ];then
            echo "$m2 won"
          fi
        exit;  fi
        if [[ (${map[2]} == ${map[5]}) && (${map[5]} == ${map[8]}) ]]; then
          if [ ${map[2]} == "$num1" ];then
            echo "$m1 won"
          fi
          if [ ${map[2]} == "$num2" ];then
            echo "$m2 won"
          fi
        exit;  fi

    #cross
        if [[ (${map[0]} == ${map[4]}) && (${map[4]} == ${map[8]}) ]]; then
          if [ ${map[0]} == "$num1" ];then
            echo "$m1 won"
          fi
          if [ ${map[0]} == "$num2" ];then
            echo "$m2 won"
          fi
        exit;  fi
        if [[ (${map[2]} == ${map[4]}) && (${map[4]} == ${map[6]}) ]]; then
          if [ ${map[2]} == "$num1" ];then
            echo "$m1 won"
          fi
          if [ ${map[0]} == "$num2" ];then
            echo "$m2 won"
          fi
        exit;  fi
}


print_map
for i in {0..8}
do
    if [[ $i%2 -eq 0 ]]
    then
        echo "$m1:"
    else
        echo "$m2:"
    fi

    read -n 1
    rep=${REPLY:0:1}

    clear

    while [[ ${map[$rep]} != $rep ]] 
    do
        print_map
        echo "Enter correct step:"
        read -n 1
        rep=${REPLY:0:1}
        clear
    done

    if [[ $i%2 -eq 0 ]]
    then
        map[$rep]="$num1"
    else
        map[$rep]="$num2"
    fi

    print_map

    check

done
    echo "DRAW"
exit
                                                                                                                       












                                                                                       
