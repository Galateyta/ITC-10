#ifndef LIST_HPP
#define LIST_HPP

struct Node {
            int value;
            Node* next;
            Node() : next(NULL) {};
};

class List {
	private:
        Node* head;
        Node* tail;
        int length;

    public:
        List();
        List(const List&);
        ~List();
	    void push(int);
        void insert(int index, int num);
        void pop();
        void deleteNode(int index);
        void print();
        Node* getHead();
        Node* reverse(Node* head);
        bool empty();
        int size();
};

#endif
