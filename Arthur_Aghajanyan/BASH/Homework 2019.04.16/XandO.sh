#!/bin/bash
map=("0" "1" "2" "3" "4" "5" "6" "7" "8")
clear
t=$1

function print_map {
    echo "Map:"
    echo "r\c[0] [1] [2]"
    echo "[0] ${map[0]} | ${map[1]} | ${map[2]}"
    echo "[1] ${map[3]} | ${map[4]} | ${map[5]}"
    echo "[2] ${map[6]} | ${map[7]} | ${map[8]}"
}

function check {
	#horizontals
        if [[ (${map[0]} == ${map[1]}) && (${map[1]} == ${map[2]}) ]]; then
                echo "${map[0]} won"; exit;  fi
        if [[ (${map[3]} == ${map[4]}) && (${map[4]} == ${map[5]}) ]]; then
                echo "${map[3]} won"; exit;  fi
        if [[ (${map[6]} == ${map[7]}) && (${map[7]} == ${map[8]}) ]]; then
                echo "${map[6]} won"; exit;  fi
    #verticals
        if [[ (${map[0]} == ${map[3]}) && (${map[3]} == ${map[6]}) ]]; then
                echo "${map[0]} won"; exit;  fi
        if [[ (${map[1]} == ${map[4]}) && (${map[4]} == ${map[7]}) ]]; then
                echo "${map[1]} won"; exit;  fi
        if [[ (${map[2]} == ${map[5]}) && (${map[5]} == ${map[8]}) ]]; then
                echo "${map[2]} won"; exit;  fi
    #cross
        if [[ (${map[0]} == ${map[4]}) && (${map[4]} == ${map[8]}) ]]; then
                echo "${map[0]} won"; exit;  fi
        if [[ (${map[2]} == ${map[4]}) && (${map[4]} == ${map[6]}) ]]; then
                echo "${map[2]} won"; exit; fi               
}

print_map

getIndex() {
    rep=$(($1*3+$2))
}

for i in {0..8}
do
    if [[ $i%2 -eq 0 ]]
    then
        echo "$1:"
    else
        echo "$2:"
    fi
    echo "Enter coordinate (e.g 2 2)" 
    read -r a b
    getIndex $a $b
    clear
    
    while [[ ${map[$rep]} != $rep ]] 
    do
        print_map
        echo "Enter correct coordinate (e.g 2 2)"

        read -r a b
        getIndex $a $b
        clear
    done
    
    if [[ $i%2 -eq 0 ]]
    then
        map[$rep]="X"
    else
        map[$rep]="O"
    fi
    
    print_map
    
    check 
    
done
    echo "DRAW"
exit
