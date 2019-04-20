#!/bin/bash
board=("." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." "." ".")
check=false
getModule() {
    mod=$(($1-$2))
    if [[ $mod -lt 0 ]];then
        mod=$(($2-$1))
        return
    fi
}
#getModule 3 6
#echo "$mod"
stepKnight() {
    getModule $1 $3
    firstMod=$mod
    getModule $2 $4 
    secondMod=$mod
    if [[ 2 == $firstMod && 1 == $secondMod ]]
    then
        check=true
        return
    elif [[ $firstMod == 1 && $secondMod == 2 ]]
    then
        check=true
        return
    else
        check=false
    fi
}
stepRook() {
    getModule $1 $3
    firstMod=$mod
    getModule $2 $4
    secondMod=$mod
    if [[ 1 -le $firstMod && $2 == $4 ]]
    then
        check=true
        return
    elif [[ 1 -le $secondMod && $1 == $3 ]]
    then
        check=true
        return
    else
        check=false
    fi
}
stepBishop() {
    getModule $1 $3
    firstMod=$mod
    getModule $2 $4
    secondMod=$mod
    if [[ $firstMod == $secondMod ]]
    then
        check=true
        return
    else
        check=false
        return
    fi
}
stepKing() {
    getModule $1 $3
    firstMod=$mod
    getModule $2 $4
    secondMod=$mod
    if [[ 1 == $firstMod && $2 == $4 ]]
    then
        check=true
        return
    elif [[ $1 == $3 && $secondMod == 1 ]]
    then
        check=true
        return
    elif [[ 1 == $firstMod && 1 == $secondMod ]]
    then
        check=true
        return
    else
        check=false
        return
    fi
}
stepQueen() {
    stepRook $1 $2 $3 $4
    if [[ $check == false ]]
    then
        stepBishop $1 $2 $3 $4
    fi
}
enterFigure() {
    echo "1-(K)ing"
    echo "2-(Q)ueeu"
    echo "3-(B)ishop" 
    echo "4-(K)night"
    echo "5-(R)ook"
}
getIndex() {
    index=$(($1*3+$2))
}
setFigureCoordinate() {
    echo "Enter figure coordinates(e.g 0 7)"
    read -r i1 j1
    getIndex $i1 $j1
    board[$index]=$1
    
}
enterFigure

echo "Enter a first figure"
read -r firstFigure
setFigureCoordinate $firstFigure
echo "Enter a second figure"
read -r secondFigure
setFigureCoordinate $secondFigure
echo "Enter a third figure"
read -r thirdFigure
setFigureCoordinate $thirdFigure

for (( i=0; i < 64; i++ ))
do
    echo -n "${board[$i]}"
    if (( $i % 8 == 0 ));then
        echo ""
    fi
done

for i in ${board[@]}; 
do 
    echo "$i"
    if ( )
done
echo "end"
