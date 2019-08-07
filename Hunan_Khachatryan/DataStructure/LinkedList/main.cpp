#include <iostream>
#include "list.h"

int main(){
    List* list = new List();
    list->pushBack(1);
    list->pushBack(2);
    list->pushBack(3);
    list->pushBack(4);
    list->pushFront(0);
    list->show();
    list->reverse();
    list->show();

    return 0;
}