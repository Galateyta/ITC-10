#ifndef LIST_HPP
#define LIST_HPP

#include <iostream>

class List {
    public:
        class Node {
            public:
                List::Node* next;
                int value;
                Node(int value = 0, Node* next = NULL);
                ~Node();
        };
    private:
        Node* head;
        int size;
    public:
        int getSize();
        Node* getHead();

        List(Node* head = NULL);
        ~List();

        void print();
        bool insert(int, int);
        void insertFront(int);
        void insertBack(int);
        
        bool remove(int);
        void removeFront();
        void removeBack();
};

List* reverse(List*);

#endif
