#!/bin/bash

arr=(">" " " " " " " " " " " " " " " " " " " " " " " " " "<")
count=6
i=0
j=13
while [ 1 == 1 ];do 
while [ $count -gt 0 ];do
    #arr
    help=${arr[i]}
    arr[i]=${arr[i+1]}
    arr[i+1]=$help
        help=${arr[j]}
        arr[j]=${arr[j-1]}
        arr[j-1]=$help
        
            i=$[i+1]
            j=$[j-1]
            count=$[count - 1]
clear
     echo "${arr[*]}"
     sleep 1
     
done

while [ $count -lt 6 ];do
    #arr
    help1=${arr[i]}
    arr[i]=${arr[i-1]}
    arr[i-1]=$help1
        help1=${arr[j]}
        arr[j]=${arr[j+1]}
        arr[j+1]=$help1

        i=$[i-1]
        j=$[j+1]
        count=$[count+1]
        clear
        echo "${arr[*]}"
        sleep 1

done
done
