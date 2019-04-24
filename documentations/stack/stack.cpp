#include <iostream>
#include "stack.hpp"

Stack::Stack(int maxSize) {
	this->maxSize = maxSize;
	array = new int[maxSize];
	topp = 0;
	std::cout << "Constructor is worked..." << std::endl;
}

Stack::~Stack() {
	delete[] array;
	std::cout << "Destructor is worked..." << std::endl;
}

void Stack::push(int value) {
	if (topp <= maxSize) {
		array[topp++] = value;
	} else {
		std::cout << "Stack is full" << std::endl;
	}
}

int Stack::pop() {
	if (topp > 0) {
		return array[--topp];
	} else {
		std::cout << "Stack is empty!" << std::endl;
		return 0;
	}
}

int Stack::top() {
	return array[topp - 1];
}

void Stack::erase() {
	if (isEmpty()) {
		std::cout << "Stack is allready empty!" << std::endl;		
	} else {
		topp = 0;
	}
}

void Stack::print() {
	if (isEmpty()) {
		std::cout << "Stack is empty! There is no elements for printing))" << std::endl;		
	} else {
		for (int i = 0; i < topp; ++i) {
			std::cout << array[i] << " ";
		}
		std::cout << std::endl;
	}
}

bool Stack::isEmpty() {
	if (topp == 0) {
		return true;
	} else {
		return false;
	}
}
