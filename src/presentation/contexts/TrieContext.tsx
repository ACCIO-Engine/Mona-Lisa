import React, {
    createContext,
    useContext,
    ReactNode,
    useState,
    useMemo,
    useEffect,
  } from "react";

import Trie from "../../application/types/Trie";

interface TrieContextProps {
    trie: Trie;
    // setTrie: (trie: Trie) => void;
}

const TrieContext = createContext<TrieContextProps | undefined>(
    undefined
);

export const useTrieContext = () => {
    const context = useContext(TrieContext);
    if (!context) {
        throw new Error("useTrieContext must be used within a TrieProvider");
    }
    return context;
};

interface TrieProviderProps {
    children: ReactNode;
}

const TrieProvider: React.FC<TrieProviderProps> = ({
    children,
}) => {
    const [trie, setTrie] = useState<Trie | null>(null);

    const value = useMemo(() => ({ trie}), [trie]);

    useEffect(() => {
        const fetchWordList = async () => {
          try {
            const response = await fetch("/words.txt");
            console.log("response", response);
            const text = await response.text();
            console.log("text", text);
            const wordsArray = text.split("\n");
            // const wordsArray = [
            //     "apple",
            //     "app",
            //     "a",
            //     "ajdd",
            //     "agfhg",
            //     "ahgjuuu",
            //     "ajsjhhj",
            //     "orange",
            //     "banana",
            //     "grape",
            //     "watermelon",
            //     "strawberry",
            //     "mango",
            //     "pineapple",
            //     "kiwi",
            //     "pear"
            // ];
            console.log("wordsArray", wordsArray);

            const newTrie = new Trie();
            wordsArray.forEach((word) => newTrie.insert(word.trim()));
            setTrie(newTrie);
          } catch (error) {
            console.error("Error loading word list:", error);
          }
        };
    
        fetchWordList();
      }, []);

    return (
        <TrieContext.Provider value={value}>
            {children}
        </TrieContext.Provider>
    );
};

export default TrieProvider;