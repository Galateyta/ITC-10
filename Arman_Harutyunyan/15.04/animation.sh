#!/bin/bash -f

function unite {

	#First  loop
	range=20
	while [ $range -ge 1 ]
	do

		#Second loop
		for ast in 3 2 1 2 3
		do

		#Always print 3 asterisks at the beginning of each row
		printf ***

		#Print left asterisks angle
		for i in 1 2 3
		do
		if [ $i -le $ast ]
		then 
		printf *
		fi
		done

		i=1
		#Print spaces
		while [ $i -lt $range ]
		do
		printf " "
		i=$(( $i + 1 ))
		done

		#Print right asterisks angle
		for i in 1 2 3 4
		do
		if [ $i -ge $ast ]
		then 
		printf *
		fi
		done
    
		#go to the next row
		echo

		#second loop's end
		done

	#wait for 0.1 seconds after each iteration
	sleep 0.1s
	#clear the terminal after each iteration
	clear

	range=$(( $range - 1 ))
	#first loop's end
	done
}

function divide {
	
	#First  loop
	range=0
	while [ $range -le 20 ]
	do

		#Second loop
		for ast in 3 2 1 2 3
		do

		#Always print 3 asterisks at the beginning of each row
		printf ***

		#Print left asterisks angle
		for i in 1 2 3
		do
		if [ $i -le $ast ]
		then 
		printf *
		fi
		done

		i=1
		#Print spaces
		while [ $i -lt $range ]
		do
		printf " "
		i=$(( $i + 1 ))
		done

		#Print right asterisks angle
		for i in 1 2 3 4
		do
		if [ $i -ge $ast ]
		then 
		printf *
		fi
		done
    
		#go to the next row
		echo

		#second loop's end
		done

	#wait for 0.1 seconds after each iteration
	sleep 0.1s
	#clear the terminal after each iteration
	clear

	range=$(( $range + 1 ))
	#first loop's end
	done
}

function engine {
	unite
	divide
	engine
}

clear
engine
