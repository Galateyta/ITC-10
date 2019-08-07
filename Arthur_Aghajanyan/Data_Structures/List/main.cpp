#include "myList.hpp"

int main(){
    MyList list;
    list.push_front(11);
    list.push_front(222);
    list.push_back(145);
    list.push_back(555);
    list.printList();
    std::cout <<"---------insert_by_index----------------" << std::endl;
    list.push_by_index(1,77777);
    list.printList();
    std::cout <<" -----------pop by index------------"<< std::endl;
    list.pop_by_index(1);
    list.printList();
    int t = list.getSize();
    std::cout << "size = " << t << std::endl;
    std::cout << "*********reverse**********" << std::endl;
    list.reverse(list.getStart());
    list.printList();
}
