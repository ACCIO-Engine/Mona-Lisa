class TrieNode {
    children: { [key: string]: TrieNode };
    isEndOfWord: boolean;

    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(prefix: string) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        return this._collectAllWords(node, prefix);
    }

    _collectAllWords(node: TrieNode, prefix = '', words = []) {
        if (node.isEndOfWord) {
            words.push(prefix);
        }
        for (const char in node.children) {
            this._collectAllWords(node.children[char], prefix + char, words);
        }
        return words;
    }
}
  
export default Trie;