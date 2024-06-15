import { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import { FixedSizeList } from "react-window";
import Trie from "../../../application/types/Trie";

const SearchInput = () => {
  const [trie, setTrie] = useState(null);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchWordList = async () => {
      try {
        const response = await fetch("/words.txt");
        console.log("response", response);
        const text = await response.text();
        console.log("text", text);
        const wordsArray = text.split("\n");
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

  const handleInputChange = useCallback(
    (event) => {
        const newInputValue = event.target.value;
      setInputValue(newInputValue);
      if (newInputValue && trie) {
        const filteredOptions = trie.search(newInputValue.toLowerCase());
        console.log(`finished search with length ${filteredOptions.length}`);
        if (filteredOptions.length < 10) {
          console.log(filteredOptions);
        }
        // take the first 10 options
        setOptions(filteredOptions);
      } else {
        setOptions([]);
      }
    },
    [trie]
  );
  const renderRow = ({ index, style }) => (
    <div style={style}>{options[index]}</div>
  );

  return (
        <>
        <TextField
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        <FixedSizeList
          height={150}
          width={300}
          itemSize={35}
          itemCount={options.length}
        //   {...props}
        >
          {renderRow}
        </FixedSizeList>
        </>    
      );
};

export default SearchInput;
