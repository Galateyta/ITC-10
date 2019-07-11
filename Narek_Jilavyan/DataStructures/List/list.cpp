#include "list.hpp"

List::List() : Head(NULL), size(0){}

List::~List(){
    toErase();
}

List::List(const List & other) : 
    Head(NULL), size(0)
{
    Node* temp = other.Head;
    while(temp != NULL){
        this -> pushBack(temp->value);
        temp = temp -> next;
    }
    temp = NULL;
}

Node* List::getHead(){
    return Head;
}

int List::getSize(){
    return size;
}

void List::pushBack(int value){
    Node* temp = this->Head;
    while(temp -> next != NULL){
        temp = temp -> next;
    }
    Node* newNode = new Node(value);
    temp->next = newNode;
    ++size;
    newNode = NULL;
}

void List::pushFront(int value){
    Node* newNode = new Node(value);
    newNode->next = Head;
    Head = newNode;
    ++size;
    newNode = NULL;
}

void List::pushByIndex(int index,int value){
    if (index > 0 && index < size){
        Node* temp = this->Head;
        for(int i = 1; i < index; i++){
            temp = temp -> next;
        }
        Node* newNode = new Node(value);
        newNode->next = temp->next;
        temp->next = newNode;
        ++size;
        newNode = NULL;
        temp = NULL;
    } else{
        if(index == 0){
            pushFront(value);
        }
        else if ( index == size ) {
            pushBack(value);
        }
    }
}

void List::popFront(){
    Node* temp = Head;
    Head = temp->next;
    temp = NULL;
    --size;
}

void List::popBack(){
    Node* temp = this->Head;
    while(temp->next->next != NULL){
        temp = temp -> next;
    }
    temp->next = NULL;
    --size;
}

void List::popByIndex(int index){
    if (index > 0 && index < size){
        Node* temp = this->Head;
        Node* deleteNode;
        for(int i = 1; i < index - 1; i++){
            temp = temp->next;
        }
        deleteNode = temp->next;
        temp->next = deleteNode->next;
        --size;
        deleteNode = NULL;
        temp = NULL;
    } else{
        if(index == 0){
            popFront();
        }
        else if ( index == size ) {
            popBack();
        }
    }
}

void List::toErase(){
    while(size > 0){
        popFront();
    }
}

void List::printList(){
    Node* temp = this->Head;
    while(temp != NULL){
        std::cout << temp->value << " ";
        temp = temp -> next;
    }
    std::cout << std::endl;
    temp = NULL;
}

Node* List::reverse(Node* head){
    if (head == NULL)
    {
        return head;
    }   
    else if(head -> next == NULL){
        Head = head;
        return head;
    }   
    Node* it = reverse(head -> next);
    it -> next = head;
    head -> next = NULL;
    return head;
}


