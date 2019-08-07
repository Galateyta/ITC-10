#include <iostream>
#include "list.hpp"

int main() {
    List* list = new List();

    list -> push(1);
    list -> push(2);
    list -> push(3);
    list -> push(4);
    list -> push(5);
    list -> push(6);
    list -> push(7);
    list -> push(8); 

    list -> print();
    list -> insert(2, 30);
    list -> pop();
    list -> pop(); 
    list -> print();
    list -> deleteNode(5);
    list -> print();
    list -> reverse(list -> getHead());
    list -> print();

    return 0;
}
