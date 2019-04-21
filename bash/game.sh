#!/bin/bash

gamer1=$1
gamer2=$2

echo -n $gamer1
echo ": your simbol is X"
echo -n $gamer2
echo  ": your simbol is O"
sleep 1.5
clear
echo -n "Are you ready?"
echo ""
sleep 1.5
echo -n "Go !!!"
echo ""

declare -A matrix
for ((i=1;i<=3;i++)) do
    for ((j=1;j<=3;j++)) do
        matrix[$i,$j]="."
    done
done

sleep 1.5
clear
echo "   1   2   3"
echo -n "1  "
echo -n ${matrix[1,1]}
echo -n " | "
echo -n ${matrix[1,2]}
echo -n " | "
echo ${matrix[1,3]}
echo "  -----------"
echo -n "2  "
echo -n ${matrix[2,1]}
echo -n " | "
echo -n ${matrix[2,2]}
echo -n " | "
echo ${matrix[2,3]}
echo "  -----------"
echo -n "3  "
echo -n ${matrix[3,1]}
echo -n " | "
echo -n ${matrix[3,2]}
echo -n " | "
echo ${matrix[3,3]}

status="OK"
tmp="y"
while [[ ( $status =~ "OK" ) ]]; do
	if [[ ( $tmp =~ "y") ]]; then
		tmp="x"
	else 
		tmp="y"
	fi

	i=0
	j=0
	read i j 
	if [[ ( ${matrix[$i,$j]} =~ "." ) ]]; then
		matrix[$i,$j]=$tmp
	else 
		echo -n "Allready busy"
		sleep 1
		if [[ ( $tmp =~ "y") ]]; then
			tmp="x"
		else 
			tmp="y"
		fi	
	fi

	clear
	echo "   1   2   3"
	echo -n "1  "
	echo -n ${matrix[1,1]}
	echo -n " | "
	echo -n ${matrix[1,2]}
	echo -n " | "
	echo ${matrix[1,3]}
	echo "  -----------"
	echo -n "2  "
	echo -n ${matrix[2,1]}
	echo -n " | "
	echo -n ${matrix[2,2]}
	echo -n " | "
	echo ${matrix[2,3]}
	echo "  -----------"
	echo -n "3  "
	echo -n ${matrix[3,1]}
	echo -n " | "
	echo -n ${matrix[3,2]}
	echo -n " | "
	echo ${matrix[3,3]}
	sleep 0.5

	for i in {1..3}
	do
		if [[ ( ${matrix[$i,1]} =~ "x" )&&( ${matrix[$i,2]} =~ "x" )&&( ${matrix[$i,3]} =~ "x" ) ]]; then
			echo -n $gamer1
			echo  "!!! You are winner !!!"
			echo -n $gamer2
			echo "!!! Don't worry!!!"
			sleep 3
			exit
		elif [[ ( ${matrix[$i,1]} =~ "y" )&&( ${matrix[$i,2]} =~ "y" )&&( ${matrix[$i,3]} =~ "y" ) ]]; then
			echo -n $gamer2
			echo "!!! You are winner !!!"
			echo -n $gamer1
			echo "!!! Don't worry!!!"
			sleep 3
			exit
		elif [[ ( ${matrix[1,$i]} =~ "x" )&&( ${matrix[2,$i]} =~ "x" )&&( ${matrix[3,$i]} =~ "x" ) ]]; then
			echo -n $gamer1
			echo "!!! You are winner !!!"
			echo -n $gamer2
			echo "!!! Don't worry!!!"
			sleep 3
			exit
		elif [[ ( ${matrix[1,$i]} =~ "y" )&&( ${matrix[2,$i]} =~ "y" )&&( ${matrix[3,$i]} =~ "y" ) ]]; then
			echo -n $gamer2
			echo "!!! You are winner !!!"
			echo -n $gamer1
			echo "!!! Don't worry!!!"
			sleep 3
			exit
		fi
	done

	if [[ ( ${matrix[1,1]} =~ "x" )&&( ${matrix[2,2]} =~ "x" )&&( ${matrix[3,3]} =~ "x" ) ]]; then 
		echo -n $gamer1
		echo "!!! You are winner !!!"
		echo -n $gamer2
		echo "!!! Don't worry!!!"
		sleep 3
		exit
	elif [[ ( ${matrix[1,1]} =~ "y" )&&( ${matrix[2,2]} =~ "y" )&&( ${matrix[3,3]} =~ "y" ) ]]; then
		echo -n $gamer2
		echo "!!! You are winner !!!"
		echo -n $gamer1
		echo "!!! Don't worry!!!"
		sleep 3
		exit
	elif [[ ( ${matrix[3,1]} =~ "x" )&&( ${matrix[2,2]} =~ "x" )&&( ${matrix[1,3]} =~ "x" ) ]]; then 
		echo -n $gamer1
		echo "!!! You are winner !!!"
		echo -n $gamer2
		echo "!!! Don't worry!!!"
		sleep 3
		exit
	elif [[ ( ${matrix[3,1]} =~ "y" )&&( ${matrix[2,2]} =~ "y" )&&( ${matrix[1,3]} =~ "y" ) ]]; then 
		echo -n $gamer2
		echo "!!! You are winner !!!"
		echo -n $gamer1
		echo "!!! Don't worry!!!"
		sleep 3
		exit
	fi
done
