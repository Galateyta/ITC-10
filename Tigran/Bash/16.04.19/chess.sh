#!/bin/bash

rook () {
	x1=$1
	y1=$2
	x2=$3
	y2=$4
	x3=$5
	y3=$6

	if ([ $x1 == $x3 ] && ( [ ! $x1 == $x2 ] || [ ! $y1 -lt $y2 ] || [ ! $y2 -lt $y3 ])) || ([ $y1 == $y3 ] && ( [ ! $y1 == $y2 ] || [ ! $x1 -lt $x2 ] || [ ! $x2 -lt $x3 ]))
	then
		canEat=true
	else
		canEat=false
	fi
}

bishop () {
	x1=$1
	y1=$2
	x2=$3
	y2=$4
	x3=$5
	y3=$6

	s1=$((x1-$x2))
	if [ $s1 -lt 0 ]
	then
		s1=$((s1*-1))
	fi

	s2=$((y1-$y2))
	if [ $s2 -lt 0 ]
	then
		s2=$((s2*-1))
	fi

	s3=$((x2-$x3))
	if [ $s1 -lt 0 ]
	then
		s1=$((s1*-1))
	fi

	s4=$((y2-$y3))
	if [ $s2 -lt 0 ]
	then
		s2=$((s2*-1))
	fi

	if [ $s1 -eq $s2 ] && [ $s3 -eq $s4 ] && [ $x1 -lt $x2 ] && [ $x2 -lt $x3 ] &&  [ $y1 -lt $y2 ] && [ $y2 -lt $y3 ]
	then
		canEat=false
	else
		s1=$((x1-$x3))
		if [ $s1 -lt 0 ]
		then
			s1=$((s1*-1))
		fi

		s2=$((y1-$y3))
		if [ $s2 -lt 0 ]
		then
			s2=$((s2*-1))
		fi

		if [ $s1 -eq $s2 ]
		then
			canEat=true
		else
			canEat=false
		fi
	fi 
}

queen () {
	x1=$1
	y1=$2
	x2=$3
	y2=$4
	x3=$5
	y3=$6

	if ([ $x1 == $x3 ] && ( [ ! $x1 == $x2 ] || [ ! $y1 -lt $y2 ] || [ ! $y2 -lt $y3 ])) || ([ $y1 == $y3 ] && ( [ ! $y1 == $y2 ] || [ ! $x1 -lt $x2 ] || [ ! $x2 -lt $x3 ]))
	then
		canEat=true
	else
		s1=$((x1-$x2))
		if [ $s1 -lt 0 ]
		then
			s1=$((s1*-1))
		fi

		s2=$((y1-$y2))
		if [ $s2 -lt 0 ]
		then
			s2=$((s2*-1))
		fi

		s3=$((x2-$x3))
		if [ $s1 -lt 0 ]
		then
			s1=$((s1*-1))
		fi

		s4=$((y2-$y3))
		if [ $s2 -lt 0 ]
		then
			s2=$((s2*-1))
		fi

		if [ $s1 -eq $s2 ] && [ $s3 -eq $s4 ] && [ $x1 -lt $x2 ] && [ $x2 -lt $x3 ] &&  [ $y1 -lt $y2 ] && [ $y2 -lt $y3 ]
		then
			canEat=false
		else
			s1=$((x1-$x3))
			if [ $s1 -lt 0 ]
			then
				s1=$((s1*-1))
			fi

			s2=$((y1-$y3))
			if [ $s2 -lt 0 ]
			then
				s2=$((s2*-1))
			fi

			if [ $s1 -eq $s2 ]
			then
				canEat=true
			else
				canEat=false
			fi
		fi 
	fi
}

king () {
	x1=$1
	y1=$2
	x2=$3
	y2=$4
	x3=$5
	y3=$6

	s1=$((x1-$x3))
	if [ $s1 -lt 0 ]
	then
		s1=$((s1*-1))
	fi

	s2=$((y1-$y3))
	if [ $s2 -lt 0 ]
	then
		s2=$((s2*-1))
	fi

	if [ $s1 -eq 1 ] || [ $s2 -eq 1 ]
	then
		canEat=true
	else
		canEat=false
	fi
}

knight () {
	x1=$1
	y1=$2
	x2=$3
	y2=$4
	x3=$5
	y3=$6

	s1=$((x1-$x3))
	if [ $s1 -lt 0 ]
	then
		s1=$((s1*-1))
	fi

	s2=$((y1-$y3))
	if [ $s2 -lt 0 ]
	then
		s2=$((s2*-1))
	fi

	if ([ $s1 -eq 1 ] && [ $s2 -eq 2 ]) || ([ $s1 -eq 2 ] && [ $s2 -eq 1 ])
	then
		canEat=true
	else
		canEat=false
	fi
}

if [ $1 == "-l" ]; then
	echo "1 - rook"
	echo "2 - knight"
	echo "3 - bishop"
	echo "4 - queen"
	echo "5 - king"
	exit
fi

declare -A board=( ["A"]=1 ["B"]=2 ["C"]=3 ["D"]=4 ["E"]=5 ["F"]=6 ["G"]=7 ["H"]=8 )

while [ 1 ]; do
	read figure1 coords1 figure2 coords2 figure3 coords3
	x1=${board[${coords1:0:1}]}
	y1=${coords1:1:2}

	x2=${board[${coords2:0:1}]}
	y2=${coords2:1:2}

	x3=${board[${coords3:0:1}]}
	y3=${coords3:1:2}

	echo "$x1 $y1 $x2 $y2 $x3 $y3"

	if [ $figure1 == 1 ]; then
		rook $x1 $y1 $x2 $y2 $x3 $y3
	elif [ $figure1 == 2 ]; then
		knight $x1 $y1 $x2 $y2 $x3 $y3
	elif [ $figure1 == 3 ]; then
		bishop $x1 $y1 $x2 $y2 $x3 $y3
	elif [ $figure1 == 4 ]; then
		queen $x1 $y1 $x2 $y2 $x3 $y3
	elif [ $figure1 == 5 ]; then
		king $x1 $y1 $x2 $y2 $x3 $y3
	else
		echo "Unknown parameter"
	fi

	if $canEat; then echo "1 -> 3"; else echo "1 X 3"; fi

	if [ $figure2 == 1 ]; then
		rook $x3 $y3 $x2 $y2 $x1 $y1
	elif [ $figure2 == 2 ]; then
		knight $x3 $y3 $x2 $y2 $x1 $y1
	elif [ $figure2 == 3 ]; then
		bishop $x3 $y3 $x2 $y2 $x1 $y1
	elif [ $figure2 == 4 ]; then
		queen $x3 $y3 $x2 $y2 $x1 $y1
	elif [ $figure2 == 5 ]; then
		king $x3 $y3 $x2 $y2 $x1 $y1
	fi

	if $canEat; then echo "3 -> 1"; else echo "3 X 1"; fi
done