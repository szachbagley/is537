class TrieNode {
  constructor() {
    this.children = {};
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let currentNode = this.root;

    for (const char of word) {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      } else {
        const newNode = new TrieNode();

        currentNode.children[char] = newNode;
        currentNode = newNode;
      }
    }

    currentNode.children["*"] = true;
  }

  search(word) {
    let currentNode = this.root;

    for (const char of word) {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      } else {
        return null;
      }
    }

    return currentNode;
  }

  isCompleteWord(word) {
    const result = this.search(word);

    if (result) {
      if (result.children["*"]) {
        return true;
      }
    }
    return false;
  }

  collectAllWords(node = null, word = "", words = []) {
    let currentNode = node ?? this.root;

    for (const [key, childNode] of Object.entries(currentNode.children)) {
      if (key === "*") {
        words.push(word);
      } else {
        this.collectAllWords(childNode, word + key, words);
      }
    }
    return words;
  }

  autocomplete(prefix) {
    const currentNode = this.search(prefix);

    if (!currentNode) {
      return [];
    }

    return this.collectAllWords(currentNode, prefix);
  }
}

const trie = new Trie();
trie.insert("dog");
trie.insert("cat");
trie.insert("catalog");
trie.insert("cats");
trie.insert("dogs");
console.log(trie);

console.log("dogg", trie.isCompleteWord("dogg"));
console.log("dog", trie.isCompleteWord("dog"));
console.log("cat", trie.isCompleteWord("cat"));
console.log("cata", trie.isCompleteWord("cata"));
console.log("catalog", trie.isCompleteWord("catalog"));

console.log("collectedWords", trie.collectAllWords().sort());
console.log(
  "collectedWords for dogg",
  trie.collectAllWords(trie.search("dogg")).sort()
);
console.log("autocomplete for dogg", trie.autocomplete("dogg").sort());
