#!/bin/bash -f

function calculate {
	echo "This is a simple calculator script"
	echo "Type the first argument and press 'Enter'"
	input1
	echo "Type which mathematical operation you want to complete (+ - * or /)"
	operation
	echo "Type the second argument and press 'Enter'"
	input2
	printf "$arg1"
	printf "$comand"
	printf "$arg2="
	echo "$arg1 $comand $arg2"|bc
	calculate
}

function input1 {
	read arg1
	if [ $(($arg1+0)) -eq $arg1 ] 2>/dev/null
	#2>/dev/null is used to hide the "integer expression expected" message
	then
	return
	else 
	echo "Please input a number"
	input1
	fi
}

function input2 {
	read arg2
	if [ $(($arg2+0)) -eq $arg2 ] 2>/dev/null
	#2>/dev/null is used to hide the "integer expression expected" message
	then
	return
	else 
	echo "Please input a number"
	input2
	fi
}

function operation {
	read comand
	if [ $comand = "+" ] || [ $comand = "-" ] || [ $comand = "*" ] || [ $comand = "/" ]
	then 
	return
	else 
	echo "Please input (+ - * or /)"
	comand
	fi
}

calculate


