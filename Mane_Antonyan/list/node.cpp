#include <iostream>
#include "list.hpp"

List::Node::Node(int value, Node* next) {
    this->value = value;
    this->next = next;
    std::cout << "Constructor Node!!!" << std::endl;
}

List::Node::~Node() {
    std::cout << "Destructor Node!!!" << std::endl;
    delete next;
}
