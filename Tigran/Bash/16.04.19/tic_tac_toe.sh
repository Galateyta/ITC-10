#!/bin/bash

p1="$1"
p2="$2"

if [ $(($RANDOM % 2 + 0)) -eq 1 ]
then
	x=$p1
	o=$p2
else
	x=$p2
	o=$p1
fi

echo "First turn: $x"

field=(
"---" 
"---" 
"---")
char="X"
while [ 1 ]
do
	# vertical
	for m in {0..3}
	do
		if [ ! ${field[0]:m:1} == "-" ] && ([ ${field[0]:m:1} == ${field[1]:m:1} ] && [ ${field[1]:m:1} == ${field[2]:m:1} ])
		then
			if [ ${field[1]:1:1} == "X" ]
			then
				echo "Win $o"
			else
				echo "Win $x"
			fi
		printf "\033[4A"
		exit
		fi
	done

	# horizontal
	for m in {0..3}
	do
		if [ ! ${field[m]:0:1} == "-" ] && ([ ${field[m]:0:1} == ${field[m]:1:1} ] && [ ${field[m]:1:1} == ${field[m]:2:1} ])
		then
			if [ ${field[1]:1:1} == "X" ]
			then
				echo "Win $o"
			else
				echo "Win $x"
			fi
		printf "\033[4A"
		exit
		fi
	done

	# diagonal
	if [ ! ${field[1]:1:1} == "-" ] && (([ ${field[0]:0:1} == ${field[1]:1:1} ] && [ ${field[1]:1:1} == ${field[2]:2:1} ]) || ([ ${field[0]:2:1} == ${field[1]:1:1} ] && [ ${field[1]:1:1} == ${field[2]:0:1} ]))
	then
		if [ ${field[1]:1:1} == "X" ]
		then
			echo "Win $o"
		else
			echo "Win $x"
		fi
		printf "\033[4A"
		exit
	fi

	for a in "${field[@]}"; do
	    echo "$a"
	done

	read i j
	(( i-- ))
	(( j-- ))

	if [ ${field[$i]:$j:1} == "-" ]
		then
		field[i]=${field[$i]:0:$j}$char${field[$i]:(( ++j )):10}

		if [ $char == "X" ]
		then
			char="O"
		else
			char="X"
		fi
	fi
	printf "\033[4A"
done