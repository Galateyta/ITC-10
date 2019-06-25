var element = document.getElementsByClassName("leftNode")[0].id;
    document.getElementById("rightNode").innerHTML = element;
}

class Node
{
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }
    add(data) {
        var newNode = new Node(data);
        if(this.root === null) {
            this.root = newNode;
            rootElem.innerHTML = `<p>${data}</p>`;
       
        } else {
            this.addNode(this.root, newNode);
        }
    }
    print(node) {
        if (node !== null) {
            this.print(node.left);
            console.log(node.data);
            this.print(node.right);
        }
    }

    addNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) {
            node.left = newNode;
            } else {
                this.addNode(node.left, newNode);
            } 
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.addNode(node.right,newNode);
            }
        }
    }
}

var tree = new BinaryTree();
var array = [15, 25, 10, 7, 22, 17, 13, 5, 9, 27];
var size = array.length;
console.log("Array size:", size);
for (let i = 0; i < size; ++i) {
    tree.add(array[i]);
}

tree.print(tree.root);
