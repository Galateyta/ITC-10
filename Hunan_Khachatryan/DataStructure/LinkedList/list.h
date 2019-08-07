#ifndef LIST_H
#define LIST_H
#include <iostream>
struct Node 
{
	public:
		int value;
		Node* next;
};

class List
{	
	private:
		int size;
		Node* head;
		Node* reverse(Node* head);

	public:
		List();
		~List();
		int getSize();
		void pushBack(int);
		void pushFront(int);
		void show();
		void reverse();
	
};
List::List()
{
	this->size = 0;
	this->head = NULL;
}
int List::getSize()
{
	return this->size;
}

void List::pushBack(int value)
{
    Node* node = new Node();
    node->value = value;
    node->next = NULL;
    if (head == NULL) {
        head = node;
    }
    else {
        Node* temp = head; 
        while (temp->next != NULL) { 
            temp = temp->next; 
        }
        temp->next = node; 
    }
	++size;

}
void List::pushFront(int value)
{
	Node* node = new Node();
	node->value = value;
	node->next = head;
	head = node;
	++size;
}

void List::show()
{
	if(NULL == head->next)
	{
		std::cout<<"Linked list is empty"<<std::endl;
	} else {
        Node* temp = head;
        while (NULL != temp) {
            std::cout << temp->value << " ";
            temp = temp->next;
        }
        std::cout << std::endl;
    }


}

Node* List::reverse(Node* node)
{
	if (node->next == NULL) { 
		head = node; 
		return node; 
	}else
		{	Node* tmp = reverse(node->next); 
			tmp->next = node; 
			return node; 
		}
}
 void List::reverse()
{
	Node* node = reverse(head);
    node->next = NULL;
}




#endif
