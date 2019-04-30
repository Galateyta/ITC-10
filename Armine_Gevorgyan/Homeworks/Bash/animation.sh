#!/bin/bash
echo "Enter number of line "
read size
echo "enter number if simbols "
read length

declare -A arr
if (( $size<=6));
then
	mid=1
elif (($size>6 && $length>8 && $size<10 && $length<13))
then
	mid=2
else
	mid=$(($size/3))
fi
range=40

size1=$(( ($range-$length)/2+1 ))

clear
for (( k=0; k<=$size1; k++ ))
do
	clear
	p=1
	m=2
	for (( i=0; i<=$size; i++ ))
	do
		count=0
		x=$(($k+$length-1))
		for ((j=0;j<=$range; j++ ))
		do
			if (( (i==0 || i==size) ));
			then	
				if (( (j>=k && j<k+length) || j==range-k ))
				then
					arr[$i,$j]='+'
				else
					arr[$i,$j]='-'
				fi
			elif ((i < size/2 ))
			then
				if (( (j==k) ));
				then
					arr[$i,$j]='+'
				elif (( (j==x-p) ))
				then
					((p++))
					arr[$i,$j]='+'
				elif (( j==range-k )) 
				then
					arr[$i,$j]='+'
				elif (( j==range-k-p ))
				then
					((n++))
					arr[$i,$j]='+'
				else
					arr[$i,$j]='-'
				fi
			else	
				 if (( (j==k) ));
	                        then
        	                        arr[$i,$j]='+'
                	        elif (( (j==x-m-mid) && count==0 ))
                        	then
                                	n=$(( $m+0 ))
                               		((m--))
                                	arr[$i,$j]='+'
                                	((count++))
                        	elif (( j==range-k ))
                        	then
                                	arr[$i,$j]='+'
                        	elif (( j==range-k-n-mid-1 && count==1 ))
                        	then
                                	((count++))
                                	((n--))
                                	arr[$i,$j]='+'
                        	else
                                	arr[$i,$j]='-'
                        	fi

			fi
		done
	done
	for ((i=0; i<= $size; i++ ))
	do
       	for ((j=0; j<$range; j++))
	do
let mm
               	printf "%s" ${arr[$i,$j]}
     	done
     	printf "\n"
	done
	for ix in {0..100000};do
	let l
	done
done
