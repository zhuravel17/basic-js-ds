const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  create(node, list) {
    if (node.data < list.data) {
      if (!list.left) {
        list.left = node;
      } else {
        this.create(node, list.left)
      }
    } 
    if (node.data > list.data) {
      if (!list.right) {
        list.right = node;
      } else {
        this.create(node, list.right)
      }
    } 
  }

  add(data) {
    const node = new Node(data);
    if (!this.rootNode) {
      this.rootNode = node;
    } else {
      this.create(node, this.rootNode);
    }
  }

  has(data) {
    let node = this.rootNode;
    while (node) {
      if (data === node.data) {
        return true;
      }
      if (data < node.data) {
        if (!node.left) {
          return false;
        }
        node = node.left;
      } 
      if (data > node.data) {
        if (!node.right) {
          return false;
        }
        node = node.right;
      } 
    }
  }

  find(data) {
    let node = this.rootNode;
    while (node) {
      if (data === node.data) {
        return node;
      }
      if (data < node.data) {
        if (!node.left) {
          return null;
        }
        node = node.left;
      } 
      if (data > node.data) {
        if (!node.right) {
          return null;
        }
        node = node.right;
      } 
    }
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (!node) return null;
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);
        return node;
      }
    };

    this.rootNode = removeNode(this.rootNode, data);
  }


  min() {
    if (!this.rootNode) return null;
    let node = this.rootNode;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.rootNode) return null;
    let node = this.rootNode;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};