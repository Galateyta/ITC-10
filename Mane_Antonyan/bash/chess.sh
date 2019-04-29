#!/bin/bash

function getFigure() {
	figure=$1
	result="Not choosed !!!"
	if [[ "$figure" -eq "1" ]];
	then
		result="King"
	elif [[ "$figure" -eq "2" ]];
	then
		result="Queen"
	elif [[ "$figure" -eq "3" ]];
	then
		result="Bishop"
	elif [[ "$figure" -eq "4" ]];
	then
		result="Knight"
	elif [[ "$figure" -eq "5" ]];
	then
		result="Rook"
	fi
	echo "$result"
}

function forRook() {
	i1=$1
	j1=$2
	i2=$3
	j2=$4

	if [[ ( "$i1" -eq "$i2" ) && ( "$j1" -eq "$j2" ) ]];
	then
		echo "Warrning !!!"
	elif [[ "$i1" -eq "$i2" ]];
	then
		echo "Rook can kill !!!"
	elif [[ "$j1" -eq "$j2" ]]; then
		echo "Rook can't kill !!!"
	fi
}

function forBishop() {
	i1=$1
	j1=$2
	i2=$3
	j2=$4

	res1=$i1-$i2
	if (( $res1 < 0  ));
	then
		(( res1 = -$res1 ))
	fi

	res2=$j1-$j2
	if (( $res2 < 0  ));
	then
		(( res2 = -$res2 ))
	fi

	if [[ "$res1" -eq "$res2" ]];
	then
		echo "Bishop can kill !!!"
	else 
		echo "Bishop can't kill !!!"
	fi
}

function forKing() {
	i1=$1
	j1=$2
	i2=$3
	j2=$4

	((res1 = $i1 - $i2))
	if (( $res1 < 0  ));
	then
		(( res1 = -$res1 ))
	fi

	((res2 = $j1 - $j2))
	if (( $res2 < 0  ));
	then
		(( res2 = -$res2 ))
	fi

	if [[ ( "$res1" -le "1" ) && ( "$res2" -le "1" ) ]];
	then
		echo "King can kill !!!"
	else 
		echo "King can't kill !!!"
	fi
}

function forQueen() {
	i1=$1
	j1=$2
	i2=$3
	j2=$4

	res1=$i1-$i2
	if (( $res1 < 0  ));
	then
		(( res1 = -$res1 ))
	fi

	res2=$j1-$j2
	if (( $res2 < 0  ));
	then
		(( res2=-$res2 ))
	fi

	if [[ ( "$i1" -eq "$i2" ) && ( "$j1" -eq "$j2" ) ]];
	then
		echo "Warrning !!!"
	elif [[ "$res1" -eq "$res2" ]];
	then
		echo "Queen can kill !!!"
	elif [[ "$i1" -eq "$i2" ]];
	then
		echo "Queen can kill !!!"
	elif [[ "$j1" -eq "$j2" ]]; then
		echo "Queen can't kill !!!"
	fi
}

function forKnight() {
	i1=$1
	j1=$2
	i2=$3
	j2=$4

	if (( $i2==$i1-1 || $i2==$i1+1 ));
	then
		if (( $j2==$j1+2 || $j2==$j1-2 ));
		then
			echo "Knight can kill !!!"
		fi
	elif (( $i2==$i1-2 || $i2==$i1+2));
	then
		if (( $j2==$j1+1 || $j2==$j1-1 ));
		then
			echo "Knight can kill !!!"
		fi
	else
		echo "Knight can't kill !!!"
	fi
}

function main() {
	echo "1. King"
	echo "2. Queen"
	echo "3. Bishop"
	echo "4. Knight"
	echo "5. Rook"

	echo "Enter number for fisrt figure: "
	read f1
	echo "Enter number for second figure: "
	read f2

	figure1=$(getFigure $f1)
	figure2=$(getFigure $f2)

	echo "Your figures are: $figure1 $figure2 $figure3 "

	echo "Enter cordinates: "
	echo "fist figure cordinates i j: "
	read i1 j1

	echo "second figure cordinates i j: "
	read i2 j2
	while (($i1 == $i2 && $j1 == $j2))
	do
		echo "Alreadu busy, please try 2nd figure cordinates: "
		read i2 j2
	done

	if  [[ "$f1" -eq 1 ]];
	then
		forKing $i1 $j1 $i2 $j2
	elif [[ $f1 -eq 2 ]];
	then
		forQueen $i1 $j1 $i2 $j2
	elif [[ $f1 -eq 3 ]];
	then
		forBishop $i1 $j1 $i2 $j2
	elif [[ $f1 -eq 4 ]];
	then
		forKnight $i1 $j1 $i2 $j2
	elif [[ $f1 -eq 5 ]];
	then
		forRook $i1 $j1 $i2 $j2
	fi

	if  [[ "$f2" -eq 1 ]];
	then
		forKing $i2 $j2 $i1 $j1
	elif [[ $f2 -eq 2 ]];
	then
		forQueen $i2 $j2 $i1 $j1
	elif [[ $f2 -eq 3 ]];
	then
		forBishop $i2 $j2 $i1 $j1
	elif [[ $f2 -eq 4 ]];
	then
		forKnight $i2 $j2 $i1 $j1
	elif [[ $f2 -eq 5 ]];
	then
		forRook $i1 $j1 $i2 $j2
	fi
}

main
