class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
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
            fillTree(node.right, currentDepth +1, maxHeight);
        }
    }
}