#!/bin/bash
rook () {

	x1=$1
	y1=$2
	x2=$3
	y2=$4
	x3=$5
	y3=$6

	if ([ $x1 == $x3 ] && ( [ $x1 -ne $x2 ] || ( [ $y1 -lt $y2 ]  && [ $y3 -lt $y2 ] ) || ( [ $y1 -gt $y2 ] && [ $y3 -gt $y2 ] ) ) ) || ([ $y1 == $y3 ] && ( [ $y1 -ne $y2 ] || ( [ $x1 -lt $x2 ]  && [ $x3 -lt $x2 ] ) || ( [ $x1 -gt $x2 ] && [ $x3 -gt $x2 ] ) ) ) 
	then
	r_eat="Rook can eat"
        else
	r_eat="Rook can not eat"
        fi
}


bishop() {

	x1=$1
	y1=$2
	x2=$3
	y2=$4
	x3=$5
	y3=$6
	
	sum1=$(( $x1 - $x3 ))
	sum2=$(( $y1 - $y3 ))
	sum3=$(( $x1 - $x2 ))
	sum4=$(( $y1 - $y2 ))

	if ([ $x1 -lt $x3 ] && [ $y1 -lt $y3 ] ) && ( [ ${sum1#-} == ${sum2#-} ] && ( [ ${sum3#-} -ne ${sum4#-} ] || ([ $x2 -lt $x1 ] || [ $x2 -gt $x3 ] ) ) )
	then
	b_eat="Bishop can eat"
        elif ([ $x1 -gt $x3 ] && [ $y1 -gt $y3 ] ) && ( [ ${sum1#-} == ${sum2#-} ] && ( [ ${sum3#-} -ne ${sum4#-} ] || ([ $x2 -gt $x1 ] || [ $x2 -lt $x3 ] ) ) )
	then
	b_eat="Bishop can eat"
	elif ([ $x1 -lt $x3 ] && [ $y1 -gt $y3 ] ) && ( [ ${sum1#-} == ${sum2#-} ] && ( [ ${sum3#-} -ne ${sum4#-} ] || ([ $x2 -lt $x1 ] || [ $x2 -gt $x3 ] ) ) )
	then
	b_eat="Bishop can eat"
        elif ([ $x1 -gt $x3 ] && [ $y1 -lt $y3 ] ) && ( [ ${sum1#-} == ${sum2#-} ] && ( [ ${sum3#-} -ne ${sum4#-} ] || ([ $x2 -gt $x1 ] || [ $x2 -lt $x3 ] ) ) )
	then
	b_eat="Bishop can eat"
        else
	b_eat="Bishop can not eat"
	fi

}

queen() {

	x1=$1
	y1=$2
	x2=$3
	y2=$4
	x3=$5
	y3=$6

	bishop $x1 $y1 $x2 $y2 $x3 $y3
	rook $x1 $y1 $x2 $y2 $x3 $y3
	if ([ "$r_eat" == "Rook can not eat" ] && [ "$b_eat" == "Bishop can not eat" ])
	then
	q_eat="Queen can not eat"
        else
	q_eat="Quenn can eat"
        fi
}

knight() {

	x1=$1
	y1=$2
	x2=$3
	y2=$4
	x3=$5
	y3=$6

	sum1=$(( $x1 - $x3 ))
	sum2=$(( $y1 - $y3 ))
	if ([ ${sum1#-} == 1 ] && [ ${sum2#-} == 2 ]) || ([ ${sum1#-} == 2 ] && [ ${sum2#-} == 1 ])
	then
	kn_eat="Knight can eat"
        else
	kn_eat="Knight can not eat"
        fi
}

king(){
      
      x1=$1
      y1=$2
      x2=$3
      y2=$4
      x3=$5
      y3=$6

      sum1=$(( $x1 - $x3 ))
      sum2=$(( $y1 - $y3 ))

      if [ ${sum1#-} == 1 ] || [ ${sum2#-} == 1 ]
      then
      k_eat="King can eat"
      else
      k_eat="King can not eat"
      fi
}

echo "
 Figure types
      "
echo "1 - rook"
	echo "2 - bishop"
	echo "3 - quenn"
	echo "4 - knight"
	echo "5 - king
	
	"

echo " Table
   1 2 3 4 5 6 7 8  y
8 
7
6
5
4
3
2
1
x
"

while [ 1 ]; do

	echo "Enter figure type and 3 coordinats"
	read figure x1 y1 x2 y2 x3 y3

	if [ $figure == 1 ]
	then
	  rook $x1 $y1 $x2 $y2 $x3 $y3
	  echo $r_eat
        elif [ $figure == 2 ]
	then
	  bishop $x1 $y1 $x2 $y2 $x3 $y3
	  echo $b_eat
	elif [ $figure == 3 ]
	then
	  queen $x1 $y1 $x2 $y2 $x3 $y3
	  echo $q_eat
	elif [ $figure == 4 ]
	then
	  knight $x1 $y1 $x2 $y2 $x3 $y3
	  echo $kn_eat
	elif [ $figure == 5 ]
	then
	  king $x1 $y1 $x2 $y2 $x3 $y3
	  echo $k_eat
	else
	  echo "Incalid argument"
        fi
done
