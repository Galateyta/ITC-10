#include <iostream>

struct Node {

    public:

        int data;

        Node* next;

 };


Node* revers (Node* tmp) {

    if(tmp->next == NULL)

        return tmp;

    else {

        Node * newhead = revers(tmp->next);

        tmp->next->next = tmp;

        tmp->next = NULL;

        return newhead;

    }

}



class List {

    private:   

        Node* head;

        int m_size;

    public :

        List(){

            head = NULL;

            m_size = 0;

        }

        List(Node* head) {

            this->head = head;

            m_size = size();

        }

        Node* getHead(){

            return this->head;

        }

        void insert(int pos,const int& elem){

            Node* tmp = new Node();

            int cout = size();

            if(pos == 0) {

                tmp->data = elem;

                tmp->next = head;

                head = tmp;

                m_size++;

            }

            else  if (pos < cout && pos > 0){

                Node* prev = head;

                tmp->data = elem;

                int i ;

                for( i = 0; i < pos - 1;++i){

                    prev = prev->next;

                }

                tmp->next = prev->next;

                prev->next = tmp;

                m_size++;

            }

            else if (pos > 0 && pos == cout) {

                Node* tmp = new Node();

                Node* cur = head;

                tmp->data = elem;

                for(int i = 0; i<pos-1; ++i){

                    cur= cur->next;

                }

                cur->next = tmp;

                m_size++;

            }

        }

        void remove(int pos){

            Node* tmp = new Node;

            Node* cur = head;

            int count = size();

            if(pos > -1 && pos < count ){

                for(int i = 0; i < count - 2;++i){

                    cur = cur->next;
                    
                    if(i == pos-1) {

                        tmp= cur->next;

                        cur = tmp;

                    }

                }

                m_size--;

            }

            else {

                std::cout<<"that position haven't\n";

            }

        }

        int find(const int& elem) {

            Node* tmp = head;

            for(int i = 0; i < size() - 1; ++i) {

                if(tmp->data == elem) {

                    return i;

                }

                tmp = tmp->next;

            }

            return -1;

        }
        
        void print(){

            Node* cur =head;

            while(cur != NULL) {

                std::cout<<cur->data<<std::endl;

                cur = cur->next ;

            }
        }
    
        int size(){

            int size = 0;

            Node* tmp = head;

            while(tmp != NULL) {

                ++size;

                tmp = tmp->next;

            }

            return size;

        }
};

int main() {

    int num = 20;

    List list;

    list.insert(0,num);

    list.insert(0,num++);

    list.insert(0,++num);

    list.insert(1,num + 100);

    list.insert(4,num--);

    list.insert(2,num + 6);

    list.insert(0,200);

    list.remove(3);

    int index = list.find(22);

    std::cout << "find index Of 22 is " << index << std::endl;

    list.print();

    std::cout << "==============================================" << std::endl;

    List l(revers(list.getHead()));

    l.print();

    return 0 ;
}

