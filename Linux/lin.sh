1. pingpong localhost հրամանի արդյունքը տեղադրեք error.txt նիշքի մեջ        Done
   pingpong localhost 2>error.txt

2. ping localhost հրամանի արդյունքը (առաջին 5 տողը) դուրս բերեք տերմինալ և միաժամանակ ավելացրեք output.txt նիշքի մեջ    Done
   ping localhost | head -n5 | tee output.txt

3. Ձեր օգտատերի բոլոր պրոցեսներին տվեք մաքսիմալ առաջնահերթություն        Done
   sudo renice -n -20 -u anna

4. ps հրամանը խմբագրեք այնպես, որ ցույց տա միայն PID, օգտատիրոջ անունը, պրոցեսի անվանումը       Done
   ps axco pid,command,user

5. Գտեք և ձեր համակարգչի մեջ տեղադրեք տերմինալում աշխատող գործիք, որի միջոցով առանձին նիշքի մեջ դուրս բերեք տեղեկություն    ձեր համակարգչի մասին (CPU, memory, storage, motherboard և այլն)      Done
   lshw > anna.txt

6. Այնպես անել, որ հրամանը կամ սկրպտը crontab֊ում աշխատեն ապրիլ, մայիս, հունիս և սեպտեմբեր ամիսների բոլոր կենտ օրերի բոլոր  զույգ ժամերի ամեն 5 րոպեն         Done
   0/5 0/2 1-31/2 4-6,9 *  <command name>

7. syslogd daemon-ը սոկետ տիպի որ նիշքի միջոցով է ստանում տեղեկատվություն          Done
   /etc/syslog.conf

8. Որ հրամանի միջոցով է հնարավոր տեսնել /etc/passwd նիշքի պարունակությունը առանց ճանապարհը նշելու (commandname passwd)  Done
   sudo passwd -Sa

9. Լռելյայն առավելագույնը քանի օգտատեր կարելի է ստեղծել Ubuntu-ում և որ նիշքի մեջ է պահվում այդ տեղեկատվությունը։       Done
   /etc/passwd - user-ի մասին ամեն ինչ
   /etc/shadow - գաղտնաբառերը
   /etc/groups - այստեղ բոլոր group-ներն են
     Լռելյայն  1 user կարելի է ստեղծել 
