#include <iostream>
#include "stack.hpp"

int main() {
	int size = 0;
	std::cout << "Enter stack size: ";
	std::cin >> size;

	Stack myStack(size);

	std::cout << "Stack initialization // enter " << size << " elements: " << std::endl;
	int element;
	for (int i = 0; i < size; ++i) {
		std::cin >> element;
		myStack.push(element);
	}

	std::cout << "Stack is: " << std::endl;
	myStack.print();

	std::cout << "Stack's last element is: " << std::endl;
	std::cout << myStack.top() << std::endl;

	std::cout << "Erase stack last element: " << std::endl;
	std::cout << "Removed element <" << myStack.pop() << "> !" << std::endl;

	std::cout << "New stack is: " << std::endl;
	myStack.print();

	std::cout << "Remove all elements at stack: " << std::endl;
	myStack.erase();

	std::cout << "New stack is: " << std::endl;
	myStack.print();


	return 0;
}
