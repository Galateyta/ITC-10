#include <iostream>
#include "list.hpp"

List :: List () {
    head = NULL;
    tail = NULL;
    length = 0;
}

List :: List (const List& obj) {
    this -> length = obj.length;
    Node* newNode = new Node;
    head = newNode;
    newNode -> value = obj.head -> value;
    Node* temp1 = obj.head;
    Node* temp2 = this -> head;
    for (int i = 1; i < length; ++i) {
        temp1 = temp1 -> next;
        Node* newNode = new Node;
        newNode -> value = temp1 -> value;
        temp2 -> next = newNode;
        temp2 = temp2 -> next;
    }
}

List :: ~List() {
    Node* temp = head;
    while (NULL != head) {
        temp = head;
        head = head -> next;
        delete temp;
    }
    head = NULL;
}

void List :: push(int num) {
    std::cout << "push" << std::endl;
    Node* newNode = new Node;
    newNode -> value = num;
    newNode -> next = NULL;
    if (NULL == head) {
        head = newNode;
        tail = head;
    } else {
        tail -> next = newNode;
        tail = tail -> next;
    }
    ++length;
}


void List :: insert(int index, int num) {
    if (index > length) {
        std::cout << "Incorect index";
    } else {
        Node* newNode = new Node;
        newNode -> value = num;
        if (0 == index) {
            newNode -> next = head;
            head = newNode;
        } else {
            Node* temp = head;
            for (int i = 1; i < index; ++i) {
                temp = temp -> next;
            }
            newNode -> next = temp -> next;
            temp -> next = newNode;
        }
        ++length;
    }
}
void List :: pop() {
    if (empty()) {
        std::cout << "List is empty";
    }

    Node* temp = head;
    while (temp -> next != tail) {
        temp = temp -> next;
        
    } 
    delete tail;
    tail = temp;
    temp -> next = NULL;
	 --length;
}

void List :: deleteNode(int index) {
    if (empty()) {
        std::cout << "List is empty";
    } else {
    Node* temp = head;
    if (0 == index) {
        head = head -> next;
        delete temp;
    } else {
        Node* node = NULL;
        for (int i = 1; i < index; ++i) {
            temp = temp -> next;
        }
        node = temp -> next;
        temp -> next = node -> next;
        delete node;
    }
    --length;
    }
}

bool List :: empty() {
    return length == 0;
}

int List :: size() {
    return length;
}

void List :: print() {
    if (empty()) {
        std::cout << "List is empty";
    } else {
        Node* temp = head;
        for (int i = 0; i < length; ++i) {
            if(temp != NULL) {
                std :: cout << temp -> value << ",";
                temp = temp -> next;
           }
        } 
        std :: cout << std :: endl; 
    }
}
Node* List :: getHead() {
    return head;
}

Node* List :: reverse(Node* headNode) { 
    if (headNode == NULL) {
        std::cout << "List is empty";
        return NULL; 
    }
    if (headNode -> next == NULL) { 
        head = headNode;
        return headNode; 
    } 
    Node* newNode = reverse(headNode -> next); 
    newNode -> next = headNode; 
    headNode -> next = NULL; 
    return headNode; 
 } 



