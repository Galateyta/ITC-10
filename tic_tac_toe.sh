name1="$1"
name2="$2"

lines=0
qu=0

index=0
coord=0
begin_index=0
end_index=0

line='   |   |   
---|---|---
   |   |   
---|---|---
   |   |   '


echo "${line}"
echo "${name1}:x"
echo "${name2}:o"
for((i=0; i<9; i++));do
if((qu == 0 ));
then
echo "${name1}"
fi
if((qu == 1 ));
then
echo "${name2}"
fi
echo input line
read  lines
echo input index
read index
coord=$((--lines*6+index))
begin_index=$((coord*4-3))
end_index=$((coord*4-2))
symbol="${line:${begin_index}:1}"
echo $symbol
while [ "${symbol:0:1}" != " " ]
do
echo input line
read  lines
echo input index
read index
coord=$((--lines*6+index))
begin_index=$((coord*4-3))
end_index=$((coord*4-2))
symbol="${line:${begin_index}:1}"
done
echo $symbol
if (( qu == 0 ));
then
echo "${line:0:${begin_index}}x${line:${end_index}:-1} "
line="${line:0:${begin_index}}x${line:${end_index}:-1} "
qu=1
elif((qu == 1 ));
then
echo "${line:0:${begin_index}}o${line:${end_index}:-1} "
line="${line:0:${begin_index}}o${line:${end_index}:-1} "
qu=0
fi

symbol1="${line:1:1}"
symbol2="${line:5:1}"
symbol3="${line:9:1}"
symbol4="${line:25:1}"
symbol5="${line:29:1}"
symbol6="${line:33:1}"
symbol7="${line:49:1}"
symbol8="${line:53:1}"
symbol9="${line:57:1}"
if [ "${symbol1:0:1}" == "${symbol2:0:1}" ];
then
 if [ "${symbol2:0:1}" == "${symbol3:0:1}" ];
then
 if [ "${symbol1:0:1}" == "x" ];
then
 echo "win ${name1}"
 break
 elif [ "${symbol1:0:1}" == "o" ];
then
echo "win ${name2}"
 break
fi
fi

elif [ "${symbol4:0:1}" == "${symbol5:0:1}" ];
then
if [ "${symbol5:0:1}" == "${symbol6:0:1}" ];
then
if [ "${symbol4:0:1}" == "x" ];
then
echo "win ${name1}"
 break
elif [ "${symbol4:0:1}" == "o" ];
then
echo "win ${name2}"
 break
fi
fi

elif [ "${symbol7:0:1}" == "${symbol8:0:1}" ];
then
if [ "${symbol8:0:1}" == "${symbol9:0:1}" ];
then
if [ "${symbol7:0:1}" == "x" ];
then
echo "win ${name1}"
 break
elif [ "${symbol7:0:1}" == "o" ];
then
echo "win ${name2}"
 break
fi
fi

elif [ "${symbol1:0:1}" == "${symbol4:0:1}" ];
then
if [ "${symbol4:0:1}" == "${symbol7:0:1}" ];
then
if [ "${symbol1:0:1}" == "x" ];
then
echo "win ${name1}"
 break
elif [ "${symbol1:0:1}" == "o" ];
then
echo "win ${name2}"
 break
fi
fi

elif [ "${symbol2:0:1}" == "${symbol5:0:1}" ];
then
if [ "${symbol5:0:1}" == "${symbol8:0:1}" ];
then
if [ "${symbol2:0:1}" == "x" ];
then
echo "win ${name1}"
 break
elif [ "${symbol2:0:1}" == "o" ];
then
echo "win ${name2}"
 break
fi
fi

elif [ "${symbol3:0:1}" == "${symbol6:0:1}" ];
then
if [ "${symbol6:0:1}" == "${symbol9:0:1}" ];
then
if [ "${symbol3:0:1}" == "x" ];
then
echo "win ${name1}"
 break
elif [ "${symbol3:0:1}" == "o" ];
then
echo "win ${name2}"
 break
fi
fi

elif [ "${symbol1:0:1}" == "${symbol5:0:1}" ];
then
if [ "${symbol5:0:1}" == "${symbol9:0:1}" ];
then
if [ "${symbol1:0:1}" == "x" ];
then
echo "win ${name1}"
 break
elif [ "${symbol1:0:1}" == "o" ];
then
echo "win ${name2}"
 break
fi
fi

elif [ "${symbol3:0:1}" == "${symbol5:0:1}" ];
then
if [ "${symbol5:0:1}" == "${symbol7:0:1}" ];
then
if [ "${symbol3:0:1}" == "x" ];
then
echo "win ${name1}"
 break
elif [ "${symbol3:0:1}" == "o" ];
then
echo "win ${name2}"
 break
fi
fi
fi

done

