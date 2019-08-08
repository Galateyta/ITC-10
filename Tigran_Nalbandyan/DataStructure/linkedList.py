class Node:
    def __init__(self, data=None):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0

    def pushNode(self, data, pos):
        newNode = Node(data)
        
        if pos == 0:
            newNode.next = self.head
            self.head = newNode
        else:
            headValue = self.head
            
            while headValue:
                if pos == 0:
                    break
                prev = headValue
                headValue = headValue.next
                
                pos -= 1
                
            prev.next = newNode
            newNode.next = headValue
            
        self.size += 1
		
    def removeNode(self, index):
        headValue = self.head
        
        if index == 0:
            self.head = headValue.next
            del headValue
            return

        while headValue:
            if index == 0:
                break
            prev = headValue
            headValue = headValue.next
            
            index -= 1
        else:
            return

        prev.next = headValue.next
        del headValue

    def printList(self):
        printValue = self.head
        while (printValue):
            print(printValue.data),
            printValue = printValue.next

    def reverse(self, item):
        if item.next == None:
            self.head = item
            return
        self.reverse(item.next)
        temp = item.next
        temp.next = item
        item.next = None
    
    def getSize(self):
        return self.size
    
llist = LinkedList()
llist.pushNode("Monday", 0)
llist.pushNode(4, 1)
llist.pushNode({'Ani': 23}, 2)
llist.pushNode(["Thu"], 3)
llist.removeNode(2)
llist.printList()

llist.reverse(llist.head)
llist.printList()