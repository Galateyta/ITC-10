#!/bin/bash

name1=$1
name2=$2

game() {
let i=0
let j=0
let num=0
let count=0
declare -A arr

for ix in {0..2};do
	for jx in {0..2};do
		arr[$ix,$jx]='-'
	done
done

prints

for index in {1..9};do
echo " "
echo "enter index i"
read i
echo "enter index j"
read j

while (( j<0 || j>2 || i<0 || i>2 ))
do	
	prints
	echo " "
	echo "please enter corected index"
	echo " "
	echo "enter index i"
	read i
	echo "enter index j"
	read j
done
 
while [ "${arr[$i,$j]}" != "-" ];
do	
	prints
	echo " "
	echo "this ittem is busy"
        echo "please try agein"
        echo " "
        echo "enter index i"
        read i
        echo "enter index j"
        read j
done

if (( index%2 == 0 ))
then 	
	((num++))
	arr[$i,$j]='0'
	prints
	if (( num > 4 ));
        then
                check    
    	fi
else	
	((num++))
	arr[$i,$j]='x'
	prints
	if (( num > 4 ));
	then
		check
	fi
fi
done
}

check() {
for ix in {0..2};do
	if [ "${arr[$ix,0]}" == "${arr[$ix,1]}" ]
	then
		if [ "${arr[$ix,0]}" == "${arr[$ix,2]}" ];
		then 
			((count++))
        		if [ "${arr[$ix,0]}" == "x" ];
        		then
				prints
                		echo "winn $name1"
                		exit
        		fi

        		if [ "${arr[$ix,0]}" == "0" ];
       	 		then
				prints
                		echo "winn $name2"
                		exit
        		fi
		fi
	fi
done

for jx in {0..2};do
        if [ "${arr[0,$jx]}" == "${arr[1,$jx]}" ]
        then
                if [ "${arr[0,$jx]}" == "${arr[2,$jx]}" ];
                then
			((count++))
                        if [ "${arr[0,$jx]}" == "x" ];
                        then
                                prints
                                echo "winn $name1"
                                exit
                        fi

                        if [ "${arr[0,$jx]}" == "0" ];
                        then
				prints
                                echo "winn $name2"
                                exit
                        fi
                fi
        fi
done

if [ "${arr[0,0]}" == "${arr[1,1]}" ]
then
	if [ "${arr[0,0]}" == "${arr[2,2]}" ];
	then
		((count++))
       		if [ "${arr[0,0]}" == "x" ];
       		then
			prints
               		echo "winn $name1"
               		exit
        	fi
        	if [ "${arr[0,0]}" == "0" ];
        	then
			prints
               		echo "winn $name2"
               		exit
        	fi

	fi
fi

if [ "${arr[0,2]}" == "${arr[1,1]}" ]
then
	if [ "${arr[0,2]}" == "${arr[2,0]}" ];
	then
		((count++))
        	if [ "${arr[0,2]}" == "x" ];
        	then
                	prints
                	echo "winn $name1"
                	exit
        	fi
        	if [ "${arr[0,2]}" == "0" ];
        	then
			prints
                	echo "winn $name2"
                	exit
        	fi
	fi
fi

if (( count == 0 && num > 8))
then
	echo " "
	echo "Draw"
	exit
fi
}

prints() {
	clear
        echo  "|${arr[0,0]}|${arr[0,1]}|${arr[0,2]}|"
        echo "_______"
        echo  "|${arr[1,0]}|${arr[1,1]}|${arr[1,2]}|"
        echo "_______"
        echo  "|${arr[2,0]}|${arr[2,1]}|${arr[2,2]}|"
        echo "_______"
        echo " "
}

game

