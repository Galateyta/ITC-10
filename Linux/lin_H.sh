1. The full name OS in file will be this:
   lsb_release -d  | cut -d ":" -f2 >anna.txt

2. sudo sh -c 'ls  ~ > /home/anna.txt'  

3. Information that is written when the OS is loaded. 
   /var/log/boot.log

4. First and last 5 rows.
   less -5 anna.txt
   tail -5 anna.txt

5. vim 2.txt
     Create 2.txt file. Then in it write on random text.
   less 2.txt
     Whit this command look inside this file.
   sort 2.txt
     Here we sort the contents of the file.

6. /home/username content in addition to begining D letters.
   ls  * | grep -v '^D'
   ls !(D*)

7. This will find file larger then 200 megabytes.
   find / -size +200M -print

8. echo -e "1\n2\n3\n4\n5\n6\n7\n8\n9" >anna.txt
   split -l 3 anna.txt

9. There are tow options.
   1. umask 353
      touch file.txt
      ls -l file.txt
   2. umask  u=r,g=w,o=r
      touch file.txt
      ls -l file.txt

10. echo "123456" |tee m | fold -w 1 | sort -r |tr --delete '\n' | head -c 3 | tee anna.txt

11. echo HelloLinux  | sed  's/ll/L/g'

