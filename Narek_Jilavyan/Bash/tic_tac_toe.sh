name1=$1
name2=$2

queue=1

line=0
index=0

coord=0

winner='-'

platform=(- - - - - - - - -)

print (){

	echo "${platform[0]} | ${platform[1]} | ${platform[2]}"
	echo "${platform[3]} | ${platform[4]} | ${platform[5]}"
	echo "${platform[6]} | ${platform[7]} | ${platform[8]}"

}
checking(){
	if [ ${platform[$1]} ==  ${platform[$2]} ]
	then
		if [ ${platform[$2]} == ${platform[$3]} ]
		then
			if [ ${platform[$1]} != "-" ]
			then
				winner=$4
			fi
		fi
	fi
}

beforeChecking(){

	case "$1" in
		"0")
			checking $1 $1+1 $1+2 $2
			checking $1 $1+3 $1+6 $2
			checking $1 $1+4 $1+8 $2
			;;
		"1")
			checking $1-1 $1 $1+1 $2
			checking $1 $1+3 $1+6 $2
			;;
		"2")
			checking $1-2 $1-1 $1 $2
			checking $1 $1+3 $1+6 $2
			checking $1 $1+2 $1+4 $2
			;;
		"3")
			checking $1 $1+1 $1+2 $2
			checking $1-3 $1 $1+3 $2
			;;
		"4")
			checking $1-1 $1 $1+1 $2
			checking $1-3 $1 $1+3 $2
			checking $1-4 $1 $1+4 $2
			checking $1-2 $1 $1+2 $2
			;;
		"5")
			checking $1-2 $1-1 $1 $2
			checking $1-3 $1 $1+3 $2
			;;
		"6")
			checking $1 $1+1 $1+2 $2
			checking $1-6 $1-3 $1 $2
			checking $1 $1-2 $1-4 $2
			;;
		"7")
			checking $1-1 $1 $1+1 $2 
			checking $1 $1-3 $1-6 $2
			;;
		"8")
			checking $1-2 $1-1 $1 $2
			checking $1-6 $1-3 $1 $2
			checking $1 $1-4 $1-8 $2
			;;
		*)
       			break
        		;;
	esac
}

echo $name1 x
echo $name2 o

for((i=0;i<9;i++));do

	if (( queue == 1));
	then
		echo $name1 x
	elif (( queue == 2));
	then
		echo $name2 o
	fi
        echo input coordinates
	read line index


	coord=$((--line*3+index-1))
	while [ ${platform[$coord]} != "-" ]
	do
		echo input coordinates
		read line index
		

		coord=$((--line*3+index-1))
	done
		if (( queue == 1));
		then
			platform[$coord]='x'
			beforeChecking $coord $name1
			queue=2	
		else (( queue == 2));
		
			platform[$coord]='o'
			beforeChecking $coord $name2
			queue=1	
		fi
	
        print

	if [ ${winner} != "-" ];
	then
		echo win $winner
		break
	fi

done

if [ ${winner} == "-" ];
then
	echo "Draw" 
fi
