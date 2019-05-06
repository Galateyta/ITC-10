#!/bin/bash

if [ ! -d A ]
then
	echo "aaa"
	mkdir A
	cd A
	touch a.txt
else	
	cd A
	echo "bbb"
	rm -rf a.txt
	touch a.txt
fi
