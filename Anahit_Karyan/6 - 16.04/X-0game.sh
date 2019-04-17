#!/bin/bash

Arr=(. . . . . . . . .)
num=0
len=3
gameOver=1

echo $1 - X
echo $2 - 0

printMatrix(){
  echo "${Arr[0]} ${Arr[1]} ${Arr[2]}"
  echo "${Arr[3]} ${Arr[4]} ${Arr[5]}"
  echo "${Arr[6]} ${Arr[7]} ${Arr[8]}"
}
(printMatrix)

checkmatch(){
  if [ ${Arr[$1]} != "." ] && [ ${Arr[$1]} == ${Arr[$2]} ] && [ ${Arr[$2]} == ${Arr[$3]} ]
  then
    gameOver=0
  fi
}

checkgame(){
  checkmatch 0 1 2
  checkmatch 3 4 5
  checkmatch 6 7 8
  checkmatch 0 3 6
  checkmatch 1 4 7
  checkmatch 2 5 8
  checkmatch 0 4 8
  checkmatch 2 4 6
}


function change {
	    
            if  [ $num == 0 ]
            then
                read -p "Enter X cordinat row 0-2: "  row
                read -p "Enter X cordinat col 0-2: "  col
                index=$((row*len+col))
		#echo $index
                 if [ ${Arr[$index]} == "." ]
                 then
                    Arr[$index]="X"
		    num=$((num+1))
                    (printMatrix)
		    return $num
                else
                    echo "This fielt is busy or invalid cordinats,enter again "
                    change
                fi

            elif  [ $num == 1 ]
            then
                read -p "Enter 0 cordinat row 0-2: "  row
                read -p "Enter 0 cordinat col 0-2: "  col
		index=$((row*len+col))
                if [ ${Arr[$index]} == "." ]
                then
                    Arr[$index]="0"
                    num=$((num-1))
		    (printMatrix)
        	    return $num
                else
                    echo "This fielt is busy or invalid cordinats,enter again"
                    change
                fi
            fi

}

while :
do
Arr="$(change)"
num=$?
(printMatrix)

#echo $num
done

