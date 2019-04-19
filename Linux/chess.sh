#!/bin/bash
num_rows=8
num_columns=8

for ((i=1;i<=num_rows;i++)) do
    for ((j=1;j<=num_columns;j++)) do
        matrix[$i,$j]="."
    done
done

function board() {
    f1="%$((${#num_rows}+1))s"
    f2=" %9s"

    printf "$f1" ''
    for ((i=1;i<=num_rows;i++)) do
        printf "$f2" $i
    done
    echo

    for ((j=1;j<=num_columns;j++)) do
        printf "$f1" $j
        for ((i=1;i<=num_rows;i++)) do
            printf "$f2" ${matrix[$i,$j]}
        done
        echo
    done
}

board

echo "King position"
read -r kc
kc=${kc:0:1}
echo $kc
read -n 1
kp=${REPLY:0:1}
echo $kp
matrix[2,$kp]='K'

echo "Queen position"
read -r qc
qc=${qc:0:1}
echo $qc
read -n 1
qp=${REPLY:0:1}
echo $qp
matrix[2,$qp]='Q'

board
