#!/bin/bash

echo "-----------------Choose the figurines with the following letters----------------"
 #navak
echo "rook - r"
 #dzi
echo "knight - k"
 #pix
echo "bishop - b"
 #taguhi
echo "queen - q"

read -p "Enter the first figurine: "  f1
read -p "Enter the row figurine1: "  r1
read -p "Enter the col figurine1: "  c1

read -p "Enter the second figurine: "  f2
read -p "Enter the row figurine2: "  r2
read -p "Enter the col figurine2: "  c2

read -p "Enter the thre figurine: "  f3
read -p "Enter the row figurine3: "  r3
read -p "Enter the col figurine3: "  c3

#menak navaki meja tarnacrac bayc aranqin figuri depqum chisht chi ashxatum
changeHitR() {
    if (( $1 == $3 ))
    then
        if(( $1 != $5 ))
        then
        echo 1
        elif(( $6 < $2 || $6 > $4 ))
        then
            echo 1
        elif
        then
            echo 0
        fi
    fi
    elif (( $2 == $4 ))
    then
        if(( $2 != $6 ))
        then
        echo 1
        elif(( $5 < $1 || $5 > $3 ))
        then
            echo 1
	elif
        then
             echo 0

        fi
    else
        echo 0
    fi
}
changeHitK() {
     if (( ( $1 == $(($3+3)) && ( $2 == $(($4-1)) || $2 == $(($4+1)) ) )  ||
	   ( $1 == $(($3-3)) && ( $2 == $(($4-1)) || $2 == $(($4+1)) ) )  ||
           ( $1 == $(($3+1)) && ( $2 == $(($4-2)) || $2 == $(($4+2)) ) )  ||
	   ( $1 == $(($3-1)) && ( $2 == $(($4-2)) || $2 == $(($4+2)) ) )
         ))
    then
        echo 1
    else
        echo 0
    fi
}
changeHitB() {
     if (( ( $1 == $2 && $3 == $4 ) ||
           ( $1 == $((8-$2)) && $3 == $((8-$4)) ) 
        ))
    then
        echo 1
    else
        echo 0
    fi
}
changeHitQ() {
if (( $(changeHitB $r1 $c1 $r2 $c2) == 1  || $(changeHitR $r1 $c1 $r2 $c2) == 1 ))
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
        break
        ;; 
esac
}

res1=$(checkid $f1 $r1 $c1 $r2 $c2 $r3 $c3)
echo $res1

res2=$(checkid $f2 $r2 $c2 $r1 $c1 $r3 $c3)
#echo $res2


if (( $res1 == 1 && $res2 == 1 ))
then
    echo '2sn el harvacum en mimyanc' 
elif (( $res1 == 1 && $res2 == 0 ))
then
    echo '$f1 figur@ harvacum e $f2'
elif (( $res1 == 0 && $res2 == 1 ))
then
    echo '$f figur@ harvacum e $f1'
elif (( $res1 == 0 && $res2 == 0 ))
then
    echo 'figurneric voch mek chi harvacum myusin'
fi
