#!/bin/bash

arr=("*" "*" "*" " " " " " " " " " " " " " " " " " " " " "*")
arr1=("*" "*" " " " " " " " " " " " " " " " " " " " " "*" "*")
arr2=("*" "*" "*" " " " " " " " " " " " " " " " " " " " " "*")
count=5
tiv=3
i=0
j=13
while [ 1 == 1 ];do 
while [ $count -gt 0 ];do
    #arr
    help=${arr[i]}
    arr[i]=${arr[tiv]}
    arr[tiv]=$help
        help=${arr[j]}
        arr[j]=${arr[j-1]}
        arr[j-1]=$help
        
    #arr1
    help=${arr1[i]}
    arr1[i]=${arr1[tiv-1]}
    arr1[tiv-1]=$help
        help=${arr1[j]}
        arr1[j]=${arr1[j-2]}
        arr1[j-2]=$help
        
    #arr2
    help=${arr2[i]}
    arr2[i]=${arr2[tiv]}
    arr2[tiv]=$help
        help=${arr2[j]}
        arr2[j]=${arr2[j-1]}
        arr2[j-1]=$help

        
            i=$[i+1]
            j=$[j-1]
            tiv=$[tiv+1]
            count=$[count - 1]
clear
     echo "${arr[*]}"
     echo "${arr1[*]}"
     echo "${arr2[*]}"
     sleep 1
     
done

while [ $count -lt 5 ];do
    #arr
    help1=${arr[tiv-1]}
    arr[tiv-1]=${arr[i-1]}
    arr[i-1]=$help1
        help1=${arr[j]}
        arr[j]=${arr[j+1]}
        arr[j+1]=$help1
    help2=${arr1[tiv-2]}
    arr1[tiv-2]=${arr1[i-1]}
    arr1[i-1]=$help2
        help2=${arr1[j-1]}
        arr1[j-1]=${arr1[j+1]}
        arr1[j+1]=$help2
       
    help1=${arr2[tiv-1]}
    arr2[tiv-1]=${arr2[i-1]}
    arr2[i-1]=$help1
        help1=${arr2[j]}
        arr2[j]=${arr2[j+1]}
        arr2[j+1]=$help1

        i=$[i-1]
        j=$[j+1]
        tiv=$[tiv-1]
        count=$[count+1]
        clear
        echo "${arr[*]}"
        echo "${arr1[*]}"
        echo "${arr2[*]}"
        sleep 1

done
done
