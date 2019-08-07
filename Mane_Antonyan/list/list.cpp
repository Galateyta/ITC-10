#include <iostream>
#include "list.hpp"

List* reverse(List* list) {
    List::Node* current = list->getHead();
    List* newList = new List();

    do {
        newList->insertFront(current->value);
        current = current->next;
    } while (current != NULL);

    return newList;
}

List::List(Node* head) {
    size = 1;
    this->head = head;
}

List::~List() {
    while (size > 0) {
        removeBack();
    }
}

int List::getSize() {
    return size;
}

List::Node* List::getHead() {
    return head;
}


bool List::insert(int value, int index) {
    if (1 == index) {
        insertFront(value);
    } else if (index > 1 && index <= size) {
        Node* current = head;
        Node* node = new Node(value);
        while (index > 2) {
            current = current->next;
            --index;
        }
        
        node->next = current->next;
        current->next = node;
        current = NULL;
        ++size;
    } else {
        std::cerr << "Not correct index!!!" << std::endl;
        return false;
    }
    
    return true;
}

void List::insertFront(int value) {
    Node* node = new Node(value);
    node->next = head;
    head = node;
    ++size;
}

void List::insertBack(int value){
    if (size == 0) {
        insertFront(value);
    } else {
        Node* current = head;
        Node* node = new Node(value);
        while (current->next != NULL) {
            current = current->next;
        }

        current->next = node;
        node->next = NULL;
        current = NULL;
    }

    ++size;
}

bool List::remove(int index) {
    if (1 == index) {
        removeFront();    
    } else if (index == size) {
        removeBack();
    } else if (index > 1 && index < size) {
        Node* current = head;
        Node* node = head->next;
        while (index != 1) {
            current = current->next;
            node = current->next;
            --index;
        }
        
        Node* tmp = node;
        current->next = node->next;
        tmp = NULL;

        --size;
    } else {
        std::cerr << "Not correct index!!!" << std::endl;
    }

    return true;
}

void List::removeFront() {
    if (0 == size) {
        std::cerr << "List is empty!!!" << std::endl;
    } else {
        Node* node = head;
        head = head->next;
        node = NULL;
        --size;
    }
}

void List::removeBack() {
    if (0 == size) {
        std::cerr << "List is empty!!!" << std::endl;
    } else if (1 == size) {
        removeFront();
    } else {
        Node* current = head;
        while (current->next != NULL) {
            current = current->next;
        }

        Node* node = current->next;
        current->next = NULL;
        node = NULL;
    }
    --size;
}

void List::print() {
    Node* node = head;
    if (0 == size) {
        std::cout << "Empty list!" << std::endl;
    } else {
        std::cout << "****PRINT*****" << std::endl;
        while (node != NULL){
            std::cout << node->value << " ";
            node = node->next;
        }
        std::cout << std::endl;
    }
}
