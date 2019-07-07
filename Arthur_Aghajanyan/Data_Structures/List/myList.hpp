#ifndef myList_hpp
#define myList_hpp
#include <iostream>
struct node{
    public:
        int data;
        node * next;
        node():
            data(0),
            next(NULL)
        {}
        node(int data,node * next = NULL):
            data(data),
            next(next)
        {}
};
class MyList{
    private:
        node * start;
        int size;
    public:
        MyList();
        ~MyList();
        MyList(const MyList & other);
        node* getStart();
        int getSize();
        void push_back(int value);
        void push_front(int value);
        void push_by_index(int index,int value);
        void pop_front();
        void pop_back();
        void pop_by_index(int index);
        void pop_all();
        void printList();
        node* reverse(node* temp);
};
#endif
