#ifndef List_hpp
#define List_hpp
#include <iostream>

struct Node{
    public:
        int value;
        Node * next;
        Node():
            value(0),
            next(NULL)
        {}
        Node(int value):
            value(value),
            next(NULL)
        {}
};

class List{
    private:
        Node * Head;
        int size;
    public:
        List();
        ~List();
        List(const List & other);
        Node* getHead();
        int getSize();
        void pushBack(int value);
        void pushFront(int value);
        void pushByIndex(int index,int value);
        void popFront();
        void popBack();
        void popByIndex(int index);
        void toErase();
        void printList();
        Node* reverse(Node*);
};



#endif