#include <iostream>
#include "list.hpp"

int main(){

    List myList;

    myList.pushFront(1);
    myList.pushBack(2);
    myList.pushByIndex(1, 3);

    for (int i = 10; i < 50; i += 4){
        myList.pushByIndex(1, i);
    }

    myList.printList();

    myList.popFront();
    myList.popBack();
    myList.popByIndex(2);

    myList.printList();

    std::cout << myList.getSize() << std::endl;
    std::cout<< std::endl;
    std::cout << myList.getHead()->value << std::endl;
    
    myList.reverse(myList.getHead());

    myList.printList();

    myList.toErase();

    myList.printList();

    return 0;
}