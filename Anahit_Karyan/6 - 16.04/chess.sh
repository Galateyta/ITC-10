#!/bin/bash

#menak navaki meja tarnacrac bayc aranqin figuri depqum chisht chi ashxatum
changeHitR() {
    if [ $1==$3 ]
    then
        if [ $1!=$5 ]
        then
        echo 1
        elif [ $6<$2 ] || [ $6>$4 ] || [ $5<$1 ] || [ $5>$3 ]
        then
            echo 1
        else
            echo 0
        fi
    elif [ $2==$4 ]
    then
        if [ $2!=$6 ]
        then
        echo 1
        elif [ $5<$1 ] || [ $5>$3 ] ||  [ $5<$1 ] || [ $5>$3 ]
        then
            echo 1
	else
            echo 0
        fi
    else
        echo 0
    fi
}
#vonc dnum em pakagcern sintaqs errora talis????????????????????????????????????
changeHitK() {
     if [[ $1 == $(($3+3))  && [[ $2 == $(($4-1)) || $2 == $(($4+1)) ]] ]] ||
	[[ $1 == $(($3-3))  && [[ $2 == $(($4-1)) || $2 == $(($4+1)) ]] ]] ||
        [[ $1 == $(($3+1))  && [[ $2 == $(($4-2)) || $2 == $(($4+2)) ]] ]] ||
	[[ $1 == $(($3-1))  && [[ $2 == $(($4-2)) || $2 == $(($4+2)) ]] ]] 
         
    then
        echo 1
    else
        echo 0
    fi
}
changeHitB() {
     if [[ [[ $1 == $2 && $3 == $4 ]] ||
         [[ $1 == $((8-$2)) && $3 == $((8-$4)) ]] ]]
    then
        if [[ $5 != $6 || $5 != $((8-$6)) ]]
        then
        echo 1
        elif [ $6<$2 ] || [ $6>$4 ] || [ $5<$1 ] || [ $5>$3 ]
        then
            echo 1
        else
            echo 0
        fi
    else
        echo 0
    fi
}

changeHitQ() {
if [ $(changeHitB $r1 $c1 $r2 $c2) == 1 ] || [ $(changeHitR $r1 $c1 $r2 $c2) == 1 ]
then
        echo 1
    else
        echo 0
    fi
}
checkid() {
case "$1" in
    "r")
        echo $(changeHitR $2 $3 $4 $5 $6 $7)
        ;;
    "k")
	echo $(changeHitR $2 $3 $4 $5)
        ;;
    "b")
        echo $(changeHitR $2 $3 $4 $5 $6 $7)
        ;;
    "q")
        echo $(changeHitR $2 $3 $4 $5 $6 $7)
        ;;

    *)
        return
        ;; 
esac
}
start() {

echo "-----------------Choose the figurines with the following letters----------------"
 #navak
echo "rook - r"
 #dzi
echo "knight - k"
 #pix
echo "bishop - b"
 #taguhi
echo "queen - q"

read -p "Enter the first figure: "  f1
read -p "Enter the row figure1 1-8: "  r1
read -p "Enter the col figure1 1-8: "  c1

read -p "Enter the second figure: "  f2
read -p "Enter the row figure2 1-8: "  r2
read -p "Enter the col figure2 1-8: "  c2

read -p "Enter the row intermediate figure 1-8: "  r3
read -p "Enter the col intermediate figure 1-8: "  c3


validet() {
    #stex senc veragrum  karam anem?
   
    sameMappings=($r1==$r2 && $c1==$c2) || ($r1==$r2 && $c3==$c3) || ($r3==$r2 && $c3==$c2)
   
    range=0<$r1<9 && 0<$c1<9 && 0<$r2<9 && 0<$c2<9 && 0<$r3<9 && 0<$c3<9
    figur1Valid=$f1=='r' || $f1=='k' || $f1=='b' || $f1=='q'
    figur2Valid=$f2=='r' || $f2=='k' || $f2=='b' || $f2=='q'
    figurValid=$figur1Valid && $figur2Valid
    #ete nuyn cordinatnerna mutqagrvel
    if [$sameMappings]
    then
	echo 'Entered the same mappings,enter the correct coordinates in range 1-8.'
        echo 0
    else
        echo 1
    fi

    if [[ $range && $figurValid ]]
    then
        echo 1
    elif [[ !$range && $figurValid ]]
    then
       echo 'Entered incorrect coordinayes,enter the correct coordinates in range 1-8.'
       echo 0
    elif [[ $range && !$figurValid ]]
    then
       echo 'Enter an invalid figure,enter the figure only from the proposed list.'
       echo 0
    fi
}

if (( $(validet) ))
then
    res1=$(checkid $f1 $r1 $c1 $r2 $c2 $r3 $c3)
    res2=$(checkid $f2 $r2 $c2 $r1 $c1 $r3 $c3)
    if [[ $res1 == 1 && $res2 == 1 ]]
    then
        echo '2sn el harvacum en mimyanc' 
    elif [[ $res1 == 1 && $res2 == 0 ]]
    then
        echo $f1 'figur@ harvacum e' $f2
    elif [[ $res1 == 0 && $res2 == 1 ]]
    then
        echo $f 'figur@ harvacum e' $f1
    elif [[ $res1 == 0 && $res2 == 0 ]]
    then
        echo 'figurneric voch mek chi harvacum myusin'
    fi
else
start
fi
}
start
