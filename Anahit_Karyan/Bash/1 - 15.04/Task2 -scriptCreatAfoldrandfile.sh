#!/bin/bash
if  [ -d ./A ];
then
	cd A
        if  [ -f ./a ];
        then
                rm -r a
        fi
        >a
else
mkdir A
cd A
>a
fi
