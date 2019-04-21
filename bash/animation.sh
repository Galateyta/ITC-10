#!/bin/bash

function print_spaces() {
	str=$(printf "%-$1s" " ")
	echo -n "${str// / }"
}

function print_asterisks() {
	str=$(printf "%-$1s" "*")
	echo -n "${str// / *}"
}

function print_base_line() {
	number_of_asterisks=$1
	spaces=$2
	is_base_line=$3

	print_asterisks $number_of_asterisks
	print_spaces $spaces

	if (($is_base_line == 1));
	then
		echo " *"
	else
		echo -n "*"
	fi
}

function print_line() {
	spaces=$1
	distance=$2
	spaces_inside_triangle=$3

	is_base_line=0
	number_of_asterisks=1
	print_base_line $number_of_asterisks $spaces $is_base_line
	print_spaces $distance
	echo -n "*"
	print_spaces $spaces_inside_triangle
	echo "*"
}

function print_shape() {
	height=$1
	width=$2
	distance=$3
	leading_spaces=$4

	for ((i = 0; i < $height; ++i));
	do
		print_spaces $leading_spaces

		if ((i == 0 || i == $height - 1));
		then
			print_base_line $width $distance 1
		else
			if (($i <= $height / 2));
			then
				((spaces = ($width - $i - 1) * 2))
				((spaces_inside_triangle = $i * 2 - 1))
			else
				((spaces = ($width - $height + $i) * 2))
				((spaces_inside_triangle = ($height - $i - 1) * 2 - 1))
			fi
			print_line $spaces $distance $spaces_inside_triangle
		fi
	done
}

function animate() {
	height=$1
	width=$2
	distance=$3


	leading_spaces=1
	for i in $(seq $distance -2 2)
	do
		clear
		print_shape $height $width $i $leading_spaces
		((leading_spaces = $leading_spaces + 1))
		sleep 0.5
	done

	distance=25
	for i in $(seq 1 2 $distance)
	do
		clear
		print_shape $height $width $i $leading_spaces
		((leading_spaces = $leading_spaces - 1))
		sleep 0.5
	done
}

for ((;;))
do
	animate 5 7 25
done
