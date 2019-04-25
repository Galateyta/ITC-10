Line_first_first='********* '
Line_first_second='******** '
Line_first_third='******* '

Line_second_first='** '
Line_second_second='*** '
Line_second_third='**** '
            
Line_third='                                         '

while :; do
	for (( i=0; i<20; i++ )); 
	do
		sleep 0.25
		third=$((41-i-i))
		echo  "${Line_third:0:i}${Line_first_first:0:-1}${Line_third:0:third}${Line_second_first:0:-1}${Line_third:0:i}" 
		echo  "${Line_third:0:i}${Line_first_second:0:-1}${Line_third:0:third}${Line_second_second:0:-1}${Line_third:0:i}" 
		echo  "${Line_third:0:i}${Line_first_third:0:-1}${Line_third:0:third}${Line_second_third:0:-1}${Line_third:0:i}" 
		echo  "${Line_third:0:i}${Line_first_second:0:-1}${Line_third:0:third}${Line_second_second:0:-1}${Line_third:0:i}" 
		echo  "${Line_third:0:i}${Line_first_first:0:-1}${Line_third:0:third}${Line_second_first:0:-1}${Line_third:0:i}" 
		printf "\033[5A"	
	done
	for (( i=20; i>0; i-- )); 
	do
		sleep 0.25
		third=$((41-i-i))
		echo  "${Line_third:0:i}${Line_first_first:0:-1}${Line_third:0:third}${Line_second_first:0:-1}${Line_third:0:i}" 
		echo  "${Line_third:0:i}${Line_first_second:0:-1}${Line_third:0:third}${Line_second_second:0:-1}${Line_third:0:i}" 
		echo  "${Line_third:0:i}${Line_first_third:0:-1}${Line_third:0:third}${Line_second_third:0:-1}${Line_third:0:i}" 
		echo  "${Line_third:0:i}${Line_first_second:0:-1}${Line_third:0:third}${Line_second_second:0:-1}${Line_third:0:i}" 
		echo  "${Line_third:0:i}${Line_first_first:0:-1}${Line_third:0:third}${Line_second_first:0:-1}${Line_third:0:i}" 
		printf "\033[5A"	
	done
done
