#!/bin/bash


Rook (){
  
    x1=$1
    y1=$2
    x2=$2
    y2=$4
    x3=$3
    y3=$6


     if ( [ $x1 -eq $x3] && ( [ $x2 -eq $x1] && ( [ $y1 -lt $y2] && [ $y2 -gt $y3]) || ( [ $y1 -gt $y2 ] && [ $y2 -lt $y3] ))) || ( [ $y1 -eq $y3 ] && ( [ $y2 -eq $y1 ] &&( [ $x1 -lt $x2 ] && [ $x2 -lt $x3 ] ) || ( [ $x1 -gt $x2 ] && [ $x 2 -gt $x3 ] )))    
  then 
	 key=true
   else 

         key=false
  	 
 fi 
    
  
 
 }

 Bishop () {

    x1=$1
    y1=$2
    x2=$2
    y2=$4
    x3=$3
    y3=$6
 
abs1=$(( $x1-$x3))
if [ $abs1 -lt 0 ]
then
abs1=$((abs1*(-1)))
fi

abs2=$(( $y1-$y3))

if [ $abs2 -lt 0 ]
then
abs2=$((abs2*(-1)))
fi



    if  [ $abs1 -eq $abs2 ]
     then 
	key=true
     else
	key=false
    fi 



 } 

 Queen (){
    x1=$1
    y1=$2
    x2=$2
    y2=$4
    x3=$3
    y3=$6
   

     Rook $x1 $y1 $x2 $y2 $x3 $y3
      if [ $key ];
       then 
          key=true	       
       else
      
	  Bishop  $x1 $y1 $x2 $y2 $x3 $y3
 	
       fi


}       

   


King (){
    x1=$1
    y1=$2
    x2=$2
    y2=$4
    x3=$3
    y3=$6
  
        abs1=$(( $x1-$x3))
	if [ $abs1 -lt 0 ]
	then
	abs1=$((abs1*(-1)))
	fi

	abs2=$(( $y1-$y3))

	if [ $abs2 -lt 0 ]
	then
	abs2=$((abs2*(-1)))
	fi


	if ( [ $abs1 -eq  0 ] || [ $abs1 -eq 1 ]) && ( [ $abs2 -eq 0 ] || [ $abs2 -eq 1 ])
 then
 	key=true
 else
	key=false

fi

}
Knigth (){
 
    x1=$1
    y1=$2
    x2=$2
    y2=$4
    x3=$3
    y3=$6

	abs1=$(( $x1-$x3))
	if [ $abs1 -lt 0 ]
	then
	abs1=$((abs1*(-1)))
	fi

	abs2=$(( $y1-$y3))

	if [ $abs2 -lt 0 ]
	then
	abs2=$((abs2*(-1)))
	fi

	if ([ $abs1 -eq 1 ] && [ $abs2 -eq 2 ]) || ([ $abs1 -eq 2 ] && [ $abs2 -eq 1 ])
	then 
		key= true

	else
	        key=false
	fi	

}
convertAlpha (){
case $1 in
	a)
	return 1
        ;;
        
	b)
	return 2
        ;;
	
	c)
	return 3
	;;
	
	d)
	return 4
	;;

	e)
	return 5
	;;

	f)
	return 6
	;;

	g)
	return 7
	;;

	h)
	return 8


esac
}

while :
do

echo "Insert first figure & coordinats"
echo "king-1, queen-2, rook-3, bishop-4, knigth-5 :"
read figur1 coord1 coord2
#xx1=${convertAlpha $coord1}
xx1=${coord1}
yy1=${coord2}

echo "Insert second figure & coordinats"
echo "king-1, queen-2, rook-3, bishop-4, knigth-5 :"
read figur2 coord1 coord2
#xx2=${convertAlpha $coord1}
xx2=${coord1}
yy2=${coord2}

echo "Insert third figure & coordinats"
echo "king-1, queen-2, rook-3, bishop-4, knigth-5 :"
read figur3 coord1 coord2
#xx3=${convertAlpha $coord1}
xx3=${coord1}
yy3=${coord2}


if [ $figure1 -eq 1 ]
 then
	King $xx1 $yy1 $xx2 $yy2 $xx3 $yy3

elif [ $fugure1 -eq 2 ]
 then
	 Queen $xx1 $yy1 $xx2 $yy2 $xx3 $yy3

elif [ $figure1 -eq 3 ]
then
 	Rook $xx1 $yy1 $xx2 $yy2 $xx3 $yy3

elif [ $figure1 -eq 4 ]
then
	Bishop $xx1 $yy1 $xx2 $yy2 $xx3 $yy3

elif [ $figure1 -eq 5 ]
then
	Knight $xx1 $yy1 $xx2 $yy2 $xx3 $yy3
else
	echo "Uncorrect figure!!! "

fi

if $key
then 
   echo "First figure can eat third figure "

else 
   echo "First figure cann't eat third figure "
  
fi
done
