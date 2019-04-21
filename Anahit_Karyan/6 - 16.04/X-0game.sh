#!/bin/bash

Arr=(. . . . . . . . .)
num=0
len=3
export gameOver=1

echo $1 - X
echo $2 - 0

printMatrix(){
  echo "${Arr[0]} ${Arr[1]} ${Arr[2]}"
  echo "${Arr[3]} ${Arr[4]} ${Arr[5]}"
  echo "${Arr[6]} ${Arr[7]} ${Arr[8]}"
}
(printMatrix)

checked(){
      echo "kanchvel e stugman funkcian"
      if [ ${Arr[$1]} != "." ] && [ ${Arr[$1]} == ${Arr[$2]} ] && [ ${Arr[$2]} == ${Arr[$3]} ]
      then
         gameOver=0
      fi
      echo $gameOver
      return $gameOver
}

checkgame(){

  case "$1" in
    "4")
       checked $1-1 $1 $1+1
       checked $1-3 $1 $1+3
       checked $1-4 $1 $1+4
       checked $1-2 $1 $1+2
        ;;
    "0")
       checked $1 $1+1 $1+2
       checked $1 $1+3 $1+6
       checked $1 $1+4 $1+8
       
        ;;
    "1")
        checked $1 $1+1 $1-1
        checked $1 $1+3 $1+6

        ;;
    "2")
        checked $1 $1-1 $1-2
        checked $1 $1+3 $1+6
        checked $1 $1+2 $1+4
        ;;
    "3")
        checked $1 $1+1 $1+2
        checked $1 $1-3 $1+3
        ;;
    "5")
        checked $1 $1-1 $1-2
        checked $1 $1+3 $1-3
        ;;
    "6")
        checked $1 $1+1 $1+2
        checked $1 $1-3 $1-6
        checked $1 $1-2 $1-4
        ;;
    "7")
        checked $1 $1+1 $1-1
        checked $1 $1-3 $1-6
        ;;
    "8")
        checked $1 $1-1 $1-2
        checked $1 $1-3 $1-6
        checked $1 $1-4 $1-8
        ;;
    *)
        break
        ;;
    
esac
}

function change {
	    
            if  (( $num%2 == 0 ))
            then
                read -p "Enter X cordinat row 0-2: "  row
                read -p "Enter X cordinat col 0-2: "  col
                index=$((row*len+col))
		if (( $row > 2 || $col > 2))
                then
		    echo "Invalid cordinats enter again "
                    change
		fi
                 if [ ${Arr[$index]} == "." ]
                 then
                    Arr[$index]="X"
		    num=$((num+1))
                    (printMatrix)
                    if (( $num > 4))
                    then
                     (checkgame $index)
                    fi
		    return $num
                else
                    echo "This fielt is busy or enter again "
                    change
                fi

            elif  (( $num%2 != 0 ))
            then
                read -p "Enter 0 cordinat row 0-2: "  row
                read -p "Enter 0 cordinat col 0-2: "  col
		index=$((row*len+col))
	        if (( $row > 2 || $col > 2 ))
                then
                    echo "Invalid cordinats enter again "
                    change
                fi

                if [ ${Arr[$index]} == "." ]
                then
                    Arr[$index]="0"
                    num=$((num+1))
		    (printMatrix)
                    if (( $num > 4))
                    then
                     (checkgame $index)
                    fi

        	    return $num
                else
                    echo "This fielt is busy enter again"
                    change
                fi
            fi

}

start() {
  while :
  do
    change
    num=$?
    echo $gameOver
    if(( num >= 9 ))
    then
        echo " Game Over With a draw"
        return
    fi
    if(( gameOver==0 ))
    then
        if (( $num%2 == 0  ))
        then
            echo "Game Over winner-X"
        else
            echo "Game Over winner-0"
        fi
    fi
  done
}
start
