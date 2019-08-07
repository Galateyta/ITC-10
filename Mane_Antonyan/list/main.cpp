#include <iostream>
#include "list.hpp"

int main() {
    List::Node* node = new List::Node(9);
    List* list = new List();

    std::cout << "List size is: " << list->getSize() << std::endl;
    int size = 0;
    while (size < 2) {
        std::cout << "Please enter size of list(>= 2): " << std::endl;
        std::cin >> size;
    } 

    for (int i = 1; i <= size; ++i) {
        int value = 0;
        std::cout << "Enter " << i << " element:" << std::endl;
        std::cin >> value;
        list->insert(value, i);
    }
    
    list->print();
    
    list->removeFront();
    list->print();
    list->removeBack();
    list->print();
    list->remove(3);
    list->print();

    List* l = reverse(list);
    l->print();

    list->insertFront(0);
    list->print();
    delete node;
    return 0;
}
