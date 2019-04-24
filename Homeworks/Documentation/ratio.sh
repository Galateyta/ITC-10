#!/bin/bash

echo "Please enter the number of numerator "
read x
echo "Please enter the number of denominator "
read y


	if ((y==0))
	then	
		echo " Division by zero"
	else
		#div=x/y
		echo "$x : $y = $(($x/$y))"
	fi

