#include "myList.hpp"

MyList::MyList(){
    size = 0;
    start = NULL;
}

MyList::~MyList() {
    pop_all();
}

MyList::MyList(const MyList & other):
    start(NULL)
{
    node* temp = other.start;
    while(temp -> next != NULL){
        this -> push_back(temp->data);
        temp = temp -> next;
    }
   this -> push_back(temp -> data); 
}

node* MyList::getStart(){
    return start;
}

int MyList::getSize(){
    return size;
}

void MyList::push_front(int value){
    node* temp = new node(value);
    temp -> next = start;
    start = temp;
    size++;
}

void MyList::push_back(int value){
    node* head = start;
    if(head == NULL){
        push_front(value);
    }else{
        node* temp = new node(value);
        while(head -> next != NULL){
            head = head -> next;
        }
        head -> next = temp;
        temp -> next = NULL;
    }
    head = NULL;
    size++;
}

void MyList::push_by_index(int index,int value){
    if(index < 1 || index > size + 1){
        std::cout << "Enter a correct index for insert element" << std::endl;
    }else{
        if(index == 1){
            push_front(value);
        }else{
            node* head = start;
            node* temp = new node(value);
            while(index - 1 > 1){
                index--;
                head = head -> next;
            }
            temp -> next = head -> next;
            head -> next = temp;
            head = NULL;
            size++;
        }
    }
}

void MyList::pop_front(){
    node* temp = start;
    start = start -> next;
    delete temp;
    temp = NULL;
    size--;
}

void MyList::pop_back(){
    node* temp = start;
    node* help = start;
    while(temp -> next != NULL){
        help = temp;
        temp = temp -> next;
    }
    help -> next = NULL;
    delete temp;
    temp = NULL;
    size--;
}

void MyList::pop_by_index(int index){
    if(index < 1 || index > size){
        std::cout << "Enter a correct index for delete element" << std::endl;
    }else{
        if(index == 1 ){
            pop_front();    
        }else{
        node* head = start;
        node* help = start -> next;
            while(index - 1 > 1){
                index--;
                help = help -> next;
                head = head -> next;
            }
            head -> next = help -> next;
            delete help;
            head = NULL;
            size--;
        }
    }
}

void MyList::pop_all() {
    int count = size;
    while(count){
        pop_front();
        --count;
    }
    start = NULL;
}

void MyList::printList(){
    node* temp = start;
    while(temp != NULL){
        std::cout<< "data - " << temp -> data << std::endl;
        temp = temp -> next;
    }
}

node* MyList::reverse(node* temp){
    if(temp == NULL){
        return temp;
    }   
    else if(temp -> next == NULL){
        start = temp;
        return temp;
    }   
    node* it = reverse(temp -> next);
    it -> next = temp;
    temp -> next = NULL;
    return temp;
}

