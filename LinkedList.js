class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LinkedList {
  constructor(node) {
    this.head = node;
    this.tail = node;

    if (node) {
      node.next = node.prev = null;
    }

    // while (this.tail.next) {
    //     this.tail = this.tail.next;
    // }
  }

  delete(index) {
    if (!this.head) {
      throw new Error("Cannot delete from empty list.");
    }

    if (index < 0) {
      throw new Error("Cannot delete a negative index.");
    }

    if (index === 0) {
      const deletedNode = this.head;

      this.head = this.head.next;
      deletedNode.next = null;

      return deletedNode;
    }

    let currentNode = this.head;
    let previousNode = null;
    let currentIndex = 0;

    while (currentIndex < index) {
      if (!currentNode.next) {
        throw new Error("Index out of range: cannot delete non-existent node.");
      }

      previousNode = currentNode;
      currentNode = currentNode.next;
      currentIndex += 1;
    }

    previousNode.next = currentNode.next;
    currentNode.next = null;

    return currentNode;
  }

  insert(index, node) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
      node.next = null;
      node.prev = null;

      return;
    }

    let currentNode = this.head;
    let previousNode = null;

    while (currentNode && index > 1) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      index -= 1;
    }

    node.next = currentNode;
    node.prev = previousNode;

    if (previousNode) {
      previousNode.next = node;
    } else {
      this.head = node;
    }

    if (currentNode) {
      currentNode.prev = node;
    } else {
      this.tail = node;
    }
  }

  prepend(node) {
    if (this.head) {
      this.head.prev = node;
    }

    if (!this.tail) {
      this.tail = node;
    }

    node.next = this.head;
    this.head = node;
    node.prev = null;
  }

  read(index) {
    if (index >= 0) {
      let currentNode = this.head;

      // NOTE: could optimize which end we use if we maintain list length

      while (currentNode && index > 0) {
        currentNode = currentNode.next;
        index -= 1;
      }

      return currentNode;
    } else {
      let currentNode = this.tail;

      index = -index - 1;

      while (currentNode && index > 0) {
        currentNode = currentNode.prev;
        index -= 1;
      }

      return currentNode;
    }
  }

  toString() {
    let currentNode = this.head;
    let result = [];

    while (currentNode) {
      result.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return result.join(" -> ");
  }
}

// The rest of this is code to test our linked list.

const node1 = new Node("Asante");
const node2 = new Node("Kinsee");
const node3 = new Node("Mark");
const node4 = new Node("Nate");
const node5 = new Node("Preston");
const node6 = new Node("Sydney");

console.log("Here are the nodes:");
console.log(node1, node2, node3, node4, node5, node6);
console.log("");

const list = new LinkedList(null);

[node5, node3].forEach((node) => {
  list.prepend(node);
  console.log(`After prepend ${node.value}`);
  console.log(list.toString());
  console.log("");
});

list.insert(1, node1);
console.log(`After insert(1, ${node1.value})`);
console.log(list.toString());
console.log("");

list.insert(1000, node6);
console.log(`After insert(1000, ${node6.value})`);
console.log(list.toString());
console.log("list.head.next.next:", list.head.next.next);
console.log("");

list.insert(3, node4);
console.log(`After insert(3, ${node4.value})`);
console.log(list.toString());
console.log("");

list.insert(2, node2);
console.log(`After insert(2, ${node2.value})`);
console.log(list.toString());
console.log("");

const testRead = [node1, node2, node3, node4, node5, node6];
let i = 0;

testRead.forEach((node) => {
  const readNode = list.read(i);

  if (!readNode || readNode.value !== node.value) {
    console.log(`Expected ${node.value}, got ${readNode?.value ?? "null"}`);
  } else {
    console.log(`Read expected node ${readNode.value}`);
  }

  i += 1;
});

console.log(`Full list: ${list.toString()}`);

try {
  list.delete(-1);
} catch (e) {
  console.log("Correctly caught error deleting -1.", e.message);
}

list.delete(0);
console.log(`List after delete(0): ${list.toString()}`);

list.delete(1);
console.log(`List after delete(1): ${list.toString()}`);

list.delete(3);
console.log(`List after delete(3): ${list.toString()}`);

try {
  list.delete(3);
} catch (e) {
  console.log("Correctly caught error delete(3):", e.message);
}

console.log(`The last node is ${list.read(-1).value}`);
