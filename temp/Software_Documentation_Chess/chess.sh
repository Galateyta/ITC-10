#!/bin/bash
firstI=0
firstJ=0
secondI=0
secondJ=0
thirdI=0
thirdJ=0
board=(
    "." "." "." "." "." "." "." "."
    "." "." "." "." "." "." "." "." 
    "." "." "." "." "." "." "." "." 
    "." "." "." "." "." "." "." "." 
    "." "." "." "." "." "." "." "." 
    "." "." "." "." "." "." "." "." 
    "." "." "." "." "." "." "." "." 
    "." "." "." "." "." "." "." ".")

printBoard() {
    j=1
    for (( i=0; i < 64; i++,j++ ))
    do
        echo -n "${board[$i]} "
        if (( $j % 8 == 0 ));then
            echo ""
        fi
    done
    echo ""
}


check=false
getModule() {
    mod=$(($1-$2))
    if [[ $mod -lt 0 ]];then
        mod=$(($2-$1))
        return
    fi
}
stepHorse() {
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
    echo "4-(H)orse"
    echo "5-(R)ook"
}
getIndex() {
    index=$(($1*8+$2))
}
setFigureCoordinate() {
    echo "Enter figure coordinates(e.g 0 7)"
    read -r i1 j1
    getIndex $i1 $j1
    board[$index]=$1
    
}
stugum() {
    if [[ $check == true ]]
    then
        echo "$1 can hit $2"
    else echo "$1 can not hit $2"
    fi
}

enterFigure

echo "Enter a first figure"
read -r firstFigure
setFigureCoordinate $firstFigure 
firstI=$i1
firstJ=$j1
echo "Enter a second figure"
read -r secondFigure
setFigureCoordinate $secondFigure
secondI=$i1
secondJ=$j1
echo "Enter a third figure"
read -r thirdFigure
setFigureCoordinate $thirdFigure
thirdI=$i1
thirdJ=$j1
printBoard


echo "first to second"
case $firstFigure in
    "K")
        stepKing $firstI $firstJ $secondI $secondJ
        stugum $firstFigure $secondFigure
        echo "first to third"
        stepKing $firstI $firstJ $thirdI $thirdJ
        stugum $firstFigure $thirdFigure;;
    "Q")
        stepQueen $firstI $firstJ $secondI $secondJ
        stugum $firstFigure $secondFigure

        echo "first to third"
        stepQueen $firstI $firstJ $thirdI $thirdJ
        stugum $firstFigure $thirdFigure;;
    "H")
        stepHorse $firstI $firstJ $secondI $secondJ
        stugum $firstFigure $secondFigure
        
        echo "first to third"
        stepHorse $firstI $firstJ $thirdI $thirdJ
        stugum $firstFigure $thirdFigure;;
    "B")
        stepBishop $firstI $firstJ $secondI $secondJ
        stugum $firstFigure $secondFigure
        
        echo "first to third"
        stepBishop $firstI $firstJ $thirdI $thirdJ
        stugum $firstFigure $thirdFigure;;

    "R")
        stepRook $firstI $firstJ $secondI $secondJ
        stugum $firstFigure $secondFigure

        echo "first to third"
        stepRook $firstI $firstJ $thirdI $thirdJ
        stugum $firstFigure $thirdFigure;;
    esac


echo "second to first"
case $secondFigure in
    "K")
        stepKing $secondI $secondJ $firstI $firstJ
        stugum $secondFigure $firstFigure;;
    "Q")
        stepQueen $secondI $secondJ $firstI $firstJ
        stugum $secondFigure $firstFigure;;
    "H")
        stepHorse $secondI $secondJ $firstI $firstJ
        stugum $secondFigure $firstFigure;;
    "B")
        stepBishop $secondI $secondJ $firstI $firstJ
        stugum $secondFigure $firstFigure;;
    "R")
        stepRook $secondI $secondJ $firstI $firstJ
        stugum $secondFigure $firstFigure;;
esac
echo "third to first"
case $thirdFigure in
    "K")
        stepKing $thirdI $thirdJ $firstI $firstJ
        stugum $thirdFigure $firstFigure;;
    "Q")
        stepQueen $thirdI $thirdJ $firstI $firstJ
        stugum $thirdFigure $firstFigure;;
    "H")
        stepHorse $thirdI $thirdJ $firstI $firstJ
        stugum $thirdFigure $firstFigure;;
    "B")
        stepBishop $thirdI $thirdJ $firstI $firstJ
        stugum $thirdFigure $firstFigure;;
    "R")
        stepRook $thirdI $thirdJ $firstI $firstJ
        stugum $thirdFigure $firstFigure;;
esac
    echo "end"
