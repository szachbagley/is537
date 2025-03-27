#!/usr/bin/env node

// Your assignment is to write code to visualize a binary tree as "ASCII art" in the form shown
// below.  You can use AI help for the first part but NOT for the second.

// Here's a nice visualization of a binary tree:

//                                R
//                ┌───────────────┴───────────────┐
//                F                               U
//        ┌───────┴───────┐               ┌───────┴───────┐
//        D               J               S               Y
//    ┌───┴───┐       ┌───┴───┐                       ┌───┴───┐
//    B       E       H       L                       X       Z
//  ┌─┴─┐                   ┌─┴
//  A   C                   K

// You can imagine many other possible visualizations too. This version uses UTF-8 box-drawing
// characters to give a good tree structure. These characters are ┴, ┐, ┌, and ─. You might want
// to copy and paste them from this description into your code file.

// Step 1. Learn how to do a level-by-level traversal of a binary tree. You can use an AI assist
// to help you figure this out.

// Step 2. Using the code from step 1 (and without the aid of AI) render your binary tree
// structure in the following style. You may want the code we did in class last week to make our
// binary tree complete (with empty nodes). Center the text for each node value in a 3-character
// field (padded with spaces as appropriate). If the value is empty because it's one of the
// empty nodes we added, just write out three spaces. Here's what the fields would look like
// (replace boxes with spaces and node values):

//                               ☐☐☐
//               ☐☐☐                             ☐☐☐
//       ☐☐☐             ☐☐☐             ☐☐☐             ☐☐☐
//   ☐☐☐     ☐☐☐     ☐☐☐     ☐☐☐     ☐☐☐     ☐☐☐     ☐☐☐     ☐☐☐
// ☐☐☐ ☐☐☐ ☐☐☐ ☐☐☐ ☐☐☐ ☐☐☐ ☐☐☐ ☐☐☐ ☐☐☐ ☐☐☐ ☐☐☐ ☐☐☐ ☐☐☐ ☐☐☐ ☐☐☐ ☐☐☐

// The following should all be true:

//     3 characters per field at the leaf level, with one space separating each field.
//     Let h be the height of a node (a leaf has height 1), then the spacing between 3-character
// fields is 2^(h + 1) - 3.
//     The spacing before the first field is 2^h - 2.

// Step 3. (Also without AI assist.) Now add the UTF-8 box-drawing characters in between the
// lines showing the node values. I call this "connector text". Here are a couple of things that
// should be true about connector text:

//     The number of horizontal line characters (─) between corner and T characters is 2^h - 1.
//     The number of spaces before the first UTF-8 box-drawing character is also 2^h - 1.

// Write code sufficient to test your implementation, and upload to Learning Suite a PDF that
// contains the source code and the console output of your solution along with an explanation
// of the time complexity (Big O analysis) of your solution. A superior solution will be optimal
// in terms of time complexity. I don't want to see light text on a dark background in your
// source code. Use a light background please.
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    if (node === null) {
      return null;
    } else if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      const aux = this.findMinNode(node.right);
      node.value = aux.value;
      node.right = this.deleteNode(node.right, aux.value);
      return node;
    }
  }

  search(node, value) {
    if (node === null) {
      return null;
    } else if (value < node.value) {
      return this.search(node.left, value);
    } else if (value > node.value) {
      return this.search(node.right, value);
    } else {
      return node;
    }
  }
}

function getMaxHeight(root) {
  if (root === null) {
    return 0;
  }
  return 1 + Math.max(getMaxHeight(root.left), getMaxHeight(root.right));
}

function convertToCompleteBinaryTree(root) {
  if (root) {
    fillTree(root, 1, getMaxHeight(root));
  }

  return root;
}

function fillTree(node, currentDepth, maxHeight) {
  if (node) {
    if (currentDepth < maxHeight) {
      if (!node.left) {
        node.left = new TreeNode("");
      }

      if (!node.right) {
        node.right = new TreeNode("");
      }

      fillTree(node.left, currentDepth + 1, maxHeight);
      fillTree(node.right, currentDepth + 1, maxHeight);
    }
  }
}

function getLevel(root, level, values = []) {
  if (!root) return values;
  if (level === 0) {
    values.push(root.value);
  } else {
    getLevel(root.left, level - 1, values);
    getLevel(root.right, level - 1, values);
  }
  return values;
}

function getAllLevels(root) {
  convertToCompleteBinaryTree(root);
  const height = getMaxHeight(root);
  let levels = {};
  for (let level = height - 1; level >= 0; level--) {
    levels[level] = getLevel(root, level, []);
  }
  return levels;
}

function prettyPrint(root) {
  tree = getAllLevels(root);
  for (let level in tree) {
  }
}

const tree = new BinaryTree();
for (let i = 0; i < 10; i++) {
  const value = Math.floor(Math.random() * 40);
  tree.insert(value);
}

console.log(tree);

console.log("Level 0:");
console.log(getLevel(tree.root, 0));

console.log("Level 1:");
console.log(getLevel(tree.root, 1));

console.log("Level 3:");
console.log(getLevel(tree.root, 3));

console.log("Level 4:");
console.log(getLevel(tree.root, 4));

console.log("The tree:");
console.log(getAllLevels(tree.root));
