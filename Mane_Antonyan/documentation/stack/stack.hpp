#include <iostream>

class Stack {
	private:
		int* array;
		int topp;
		int maxSize;
	public:
		Stack(int);
		~Stack();
		void push(int);
		int pop();
		int top();
		void erase();
		void print();
		bool isEmpty();
};
