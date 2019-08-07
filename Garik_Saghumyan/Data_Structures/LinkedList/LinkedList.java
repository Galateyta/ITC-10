public class LinkedList {

	private Node head;
	private int size = 0;
	private Node last;

	public void insertAtEnd(int value) {

		if(head == null) {
			head = last = new Node(value);
		}else {
			last.next = new Node(value);
			last = last.next;
		}
		size++;
	}

	public void insertAtBegin(int value) {

		Node node = new Node(value);	
		node.next = head;
		head = node;
		size++;
	}

	public void insertByIndex(int index, int value) {

		Node previous = getNode(index - 1);
		Node newNode = new Node(value);
		newNode.next = previous.next;
		previous.next = newNode;
		size++;

	}

	public void remove(int index) {
		Node previous = getNode(index - 1);
		previous.next = previous.next.next;
		size--;
	}
	
	private Node reverseRecursive(Node node){ 

		Node newHead;
		if((node.next == null)){ 
			return node; 
		}
		newHead = reverseRecursive(node.next);
		node.next.next = node; 
		node.next = null; 
		return newHead; 
    }

    public void reverseRecursive(){
        head = reverseRecursive(head);
    } 

	@Override
	public String toString() {

		StringBuilder sb = new StringBuilder();
		sb.append("[");
		Node p = head;
		while(p != null) {
			sb.append(p.value);
			if(p.next != null) {
				sb.append(",");
			}
			p = p.next;
		}

		sb.append("]");
		return sb.toString();
	}


	public int get(int index) {
		return getNode(index).value;
	}


	private Node getNode(int index) {
		Node p = head;
		for(int i = 0; i < index; i++) {
			p = p.next;
		}
		return p;
	}



	private class Node {
		private int value;
		private Node next;

		private Node(int value) {
			this.value = value;
		}

	}

}
