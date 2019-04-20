#!/bin/bash

declare -A arr

starts() {
	init
	prints
	echo " "
	echo "Chechk figures " 
	echo "
King  -> 1
Queen   -> 2
Bishop -> 3
Knight  -> 4
Rook   -> 5"
	echo " "
	inputs
}
 
inputs() {
	echo "For example 1 2 3 (1->King its cordinats will be (2:3)) "
	echo "Enter first figur and its coordinats " 
	read q1 x1 y1
	echo "Enter second figur and its coordinats " 
	read q4 x2 y2
	echo "Enter third figur and its coordinats "
	read q7 x3 y3

	newinit $q1 $x1
	newinit $q4 $x2
	newinit $q7 $x3
	game
}

newinit(){
	qar=$1
	x=$2

	case $qar in
		1)
		if ((x==x1))
		then
			arr[$x1,$y1]='K'
		elif ((x==x2))
		then
			arr[$x2,$y2]='K'
		else
			arr[$x3,$y3]='K'
		fi
		;;
		2) 
		if ((x==x1))
                then
        	        arr[$x1,$y1]='Q'
                elif ((x==x2))
                then
                	arr[$x2,$y2]='Q'
                else
                        arr[$x3,$y3]='Q'
                fi
                ;;
		3)
		if ((x==x1))
                then
                        arr[$x1,$y1]='B'
                elif ((x==x2))
                then
                        arr[$x2,$y2]='B'
                else
                        arr[$x3,$y3]='B'
                fi
                ;;
		4)
		if ((x==x1))
                then
                        arr[$x1,$y1]='F'
                elif ((x==x2))
                then
                        arr[$x2,$y2]='F'
                else
                        arr[$x3,$y3]='F'
                fi
                ;;
		5)
		if ((x==x1))
                then
                        arr[$x1,$y1]='R'
                elif ((x==x2))
                then
                        arr[$x2,$y2]='R'
                else
                        arr[$x3,$y3]='R'
                fi
                ;;
		*)
		echo "Figurs Error"
		;;
	esac
}

game() {
	clear
	prints
	call q1
	call q7
}

call() {
let qar=$1
case $qar in 
	1)
		king
		if ((num1))
		then
			echo " "
			echo " King ate "
		fi
		;;
	2)
		queen
		if ((num2))
		then
			echo " "
			echo " Queen ate "
		fi
		;;
	3)
		bishop
		if ((num3))
		then
			echo " "
			echo " Bishop ate"
		fi
		;;
	4)
		knight
		if ((num4))
		then
			echo " "
			echo " Kinght ate"
		fi
		;;
	5)
		rook
		if ((num5))
		then
			echo " "
			echo " Rook ate"
		fi
		;;
	*)
		echo "That figurs does not "
		;;
	esac
}


bishop() {
	if (( (x1+y1)==(x3+y3) ));
	then
        	if (( (x1+y1)==(x2+y2) ));
        	then
                	if (( (x1-y1)>(x2-y2) && (x2-y2)>(x3-y3) ));
                	then
				num3=0
                	elif (( (x3-y3)>(x2-y2) && (x2-y2)>(x1-y1) ));
                	then
				num3=0
                	else
				num3=1
                	fi

        	else
			num3=1
        	fi
	elif (( (x1-y1)==(x3-y3) ));
	then
		if (( (x2-y1)==(x2-y2) ));
		then
        		if (( (x1+y1)<(x2+y2) && (x2+y2)<(x3+y3) ));
        		then
				num3=0
			elif (( (x3+y3)<(x2+y2) && (x2+y2)<(x1+y1i) ))
			then
				num3=0
			else	
				num3=1
        		fi
		else 
			num3=1
		fi
	else 
		num3=0
	fi
}

rook() {
	let num=5
        if ((x1==x3 || y1==y3));
        then
                if (( x1==x2 || y1==y2))
                then
                        if (( (x1<x2) && (x2<x3) || (y1<y2) && (y2<y3) ))
                        then
				num5=0
                        elif (( (x1>x2) && (x2>x3) || (y1>y2) && (y2>y3) ))
                        then
				num5=0
                        else
				num5=1
                        fi
                else
			num5=1
                fi
        else
		num2=0
        fi

}

queen() {
	let num2=0
	bishop
	rook
	if ((num3==1 || num5==1))
	then
	num2=1
	fi 

}

king() {
	let num4=0
	if (( (x1==(x3-1) || x1==(x3+1)) && (y1==(y3-1) || y1==(y3+1) ) ))
	then
		num1=1
	fi

}

knight() {
	let num4=0
	if ((y3==y1-1)) 
	then
		if ((x3==x1-2 || x3==x1+2))
		then
			num4=1
		fi
	elif ((y3==y1+1)) 
	then 
		if (( x3==x1-2 || x3==x1+2)) 
		then
			num4=1
		fi
	elif ((x3==x1-1))
	then
		if ((y3==y1-2 || y3==y1+2))
		then
			num4=1
		fi
	elif ((x3==x1+1))
	then
		if ((y3==y1-2 || y3==y1+2))
		then
			num4=1
		fi
	fi
}


init() {
	clear
	for ix in {0..7};do
        	for jx in {0..7};do
                        arr[$ix,$jx]=' '
        	done
	done
}

prints() {
	echo "    A | B | C | D | E | F | G | H |"
	echo "___________________________________"
	let jx=1
	for ix in {0..7};do
		echo "$jx | ${arr[$ix,0]} | ${arr[$ix,1]} | ${arr[$ix,2]} | ${arr[$ix,3]} | ${arr[$ix,4]} | ${arr[$ix,5]} | ${arr[$ix,6]} | ${arr[$ix,7]} |"
        	echo "___________________________________"
		((jx++))
	done
}

starts
