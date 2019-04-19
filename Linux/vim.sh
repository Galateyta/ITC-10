1. Recording mod. The numbering of the lines of the file:
   :%s/^/\=line('.')/

2. Create a new file and write bash skript inside it. Use this to create a folder and a file in it.  
   vim file
   #!/bin/bash

   mkdir test
   cd test
   touch fill1
   ls -al

3. Open .bashrc file by entering the command:
   vim ~/.bashrc
   Edit this file by adding your command in last, like:
   cd ~/Docuements
   Save the file and restart the terminal.

4. To runing the script you must:

   Set execute permission on your script:
   chmod +x script-name-here.sh

   To run your script, enter:
   a)  ./script-name-here.sh
   b)  sh script-name-here.sh
   3)  bash script-name-here.sh

5. Creating moving geometric shapes. 

#!/bin/bash

function triangle() {
    str="$1*"

    for i in 1 2 3 4 5 6
    do
        echo "$str"
        if [ ${i} -le 3 ]
        then
            str="$str*"
        else
            str=${str%?}
        fi
    done
    echo "$str"
}

function moveTo() {
    str=" "
    for i in {1..25}
    do
        str="${str} "
        triangle "${str}"
    sleep .5
    clear
    done
}

moveTo	
