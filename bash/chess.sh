#!/bin/bash

getFigure() {
	result="Non"
	if [[ "$1" -eq "1" ]]; then
		result="King"
	elif [[ "$1" -eq "2" ]]; then
		result="Queen"
	elif [[ "$1" -eq "3" ]]; then
		result="Bishop"
	elif [[ "$1" -eq "4" ]]; then
		result="Knight"
	elif [[ "$1" -eq "5" ]]; then
		result="Rook"
	fi
	echo "$result"
}

forRook() {
	result=false
	if [[ ( "$1" -eq "$3" ) && ( "$2" -eq "$4" ) ]]; then
		return false;
		echo "Warrning !!!"
	elif [[ "$1" -eq "$3" ]]; then
		result=true
	elif [[ "$2" -eq "$4" ]]; then
		result=true
	fi
	echo "$result"
}

forBishop() {
	res1= expr $1 - $3
	res2= expr $2 - $4
	if [[ "$res1" -eq "$res2" ]]; then
		result=true
	else 
		result=false
	fi
	echo $result
}

forKing() {
	res1= expr $1 - $3
	res2= expr $2 - $4
	if [[ ( "$res1" -le "1" ) && ( "$res2" -le "1" ) ]]; then
		result=true
	else 
		result=false
	fi
	echo $result
}

forQueen() {
	if [[ ( $(forBishop $1 $2 $3 $4)==true ) && ( $(forRook $1 $2 $3 $4)==true ]]; then
		result=true
	else
		result=false
	fi
	echo $result
}

forKnight() {
}

echo "1. King"
echo "2. Queen"
echo "3. Bishop"
echo "4. Knight"
echo "5. Rook"

f1=0
f2=0
f3=0

echo "Enter number for fisrt figure: "
read f1
echo "Enter number for second figure: "
read f2
echo "Enter number for third figure: "
read f3

i1=0
i2=0
i3=0
j1=0
j2=0
j3=0

echo "Enter number for third figure: "
echo "Enter cordinates: "
echo "fist figure: "
read i1 j1
echo "second figure: "
read i2 j2
echo "third figure: "
read i3 j3

figure1=$(getFigure $f1)
figure2=$(getFigure $f2)
figure3=$(getFigure $f3)

if [[ ( $figure1=="King" ) ]]; then
	forKing $i1 $j1 $i2 $j2
else [[ ]]; then 
	forQueen $i1 $j1 $i2 $j2
fi

echo "You are choose $figure1 $figure2 $figure3"
