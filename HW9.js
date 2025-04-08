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

function getLevel(root, level, nodes = []) {
  if (!root) return nodes;
  if (level === 0) {
    nodes.push(root);
  } else {
    getLevel(root.left, level - 1, nodes);
    getLevel(root.right, level - 1, nodes);
  }
  return nodes;
}

function getAllLevels(root) {
  convertToCompleteBinaryTree(root);
  const height = getMaxHeight(root);
  let levels = [];
  for (let level = 0; level < height; level++) {
    levels.push(getLevel(root, level, []));
  }
  return levels;
}

function formatValue(val) {
  let str = String(val);
  if (str.length > 3) {
    str = str.slice(0, 3);
  }

  if (str.length == 0) {
    str = "   ";
  } else if (str.length == 1) {
    str = " " + str + " ";
  } else if (str.length == 2) {
    str = " " + str;
  }
  // while (str.length < 3) {
  //   str = str + "_";
  // }
  return str;
}

function prettyPrint(root) {
  console.log("Step 2 -- prettyPrint():")
  console.log("\n");
  let tree = getAllLevels(root);
  let height = getMaxHeight(root);
  for (let level in tree) {
    let levelStr = "";
    for (let i = 0; i < ((2 ** height) - 2); i++) {
      levelStr = levelStr + " ";
    }
    for (let i = 0; i < tree[level].length; i++) {
      let valStr = formatValue(tree[level][i].value);
      levelStr = levelStr + valStr;
      if (i != tree[level].length - 1) {
        for (let i = 0; i < (2 ** (height + 1)) - 3; i++) {
          levelStr = levelStr + " ";
        }
      }
      
    }
    console.log(levelStr);
    height--;
  }
}

function prettyPrintV2(root) {
  console.log("Step 3 -- prettyPrintV2():");
  console.log("\n");
  let tree = getAllLevels(root);
  let initHeight = getMaxHeight(root);
  let height = initHeight;
  for (let level in tree) {
    let levelStr = "";
    let lineStr = "";
    let endPair = false;
    
    let leadSpaces = (2 ** height) - 2;
    for (let i = 0; i < leadSpaces; i++) {
      levelStr += " ";
      lineStr += " ";
    }
    
    for (let i = 0; i < tree[level].length; i++) {
      let node = tree[level][i];
      let exists = true;
      let nextExists = false;
      let valStr = formatValue(node.value);

      levelStr += valStr;
      if (valStr == "   ") { exists = false; }
      if (i < tree[level].length - 1) {
        let next = tree[level][i + 1];
        if (next.value != '') {
          nextExists = true;
        }
      }
      if (!endPair && exists) {
        lineStr += " ┌─";
      } else if (exists) {
        lineStr += "─┐ ";
      } else {
        lineStr += "   ";
      }
      
      if (i !== tree[level].length - 1) {
        let betweenCount = (2 ** (height + 1)) - 3;
        for (let j = 0; j < betweenCount; j++) {
          levelStr += " ";
          if (!endPair) {
            if (j === Math.floor(betweenCount / 2) && (exists || nextExists)) {
              lineStr += "┴";
            } else if (exists && j < Math.floor(betweenCount / 2)) {
              lineStr += "─";
            } else if (nextExists && j > Math.floor(betweenCount / 2)) {
              lineStr += "─";
            } else {
              lineStr += " ";
            }
          } else {
            lineStr += " ";
          }
        }
      }
      
      endPair = !endPair;
    }
    if (height !== initHeight) {
      console.log(lineStr);
    }
    console.log(levelStr);
    height--;
  }
}

const tree = new BinaryTree();
for (let i = 0; i < 10; i++) {
  const value = Math.floor(Math.random() * 40);
  tree.insert(value);
}

// const tree = new BinaryTree();
// tree.insert(5);
// tree.insert(9);
// tree.insert(2);
// tree.insert(3);
// tree.insert(8);
// tree.insert(6);
// tree.insert(7);
// tree.insert(4);
// tree.insert(1);
// tree.insert(0);

console.log("\n");
prettyPrint(tree.root);
console.log("\n");
prettyPrintV2(tree.root);
