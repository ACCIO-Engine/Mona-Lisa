import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  styled
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import ImageIcon from "@mui/icons-material/Image";

import { alpha } from "@mui/system";
import { useCallback, useState } from "react";
import { useTrieContext } from "../../contexts/TrieContext";
import { FixedSizeList, ListChildComponentProps } from "react-window";

const SearchContainer = styled(Box)(({ theme }) => ({
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: "24px",
  background: `radial-gradient(circle at center,${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.primary.light, 0.1)} 50%, ${alpha(theme.palette.primary.light, 0.2)} 100%)`,
  boxShadow: `0 8px 1rem 0 ${alpha(theme.palette.primary.dark, 0.2)}`,
  backdropFilter: "blur( 4px )",
  WebkitBackdropFilter: "blur( 4px )"
}));
export default function LargeSearch({
  onChooseImage,
  onSearchText,
  onChooseMic
}: {
  onChooseImage: (image: string) => void;
  onSearchText: (text: string) => void;
  onChooseMic: () => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const { trie } = useTrieContext();

  const handleInputChange = useCallback(
    (event) => {
      const newInputValue = event.target.value;
      setInputValue(newInputValue);
      const tokens = newInputValue.split(' ');
      const lastToken = tokens[tokens.length-1];
      if (lastToken && trie) {
        const filteredOptions = trie.search(lastToken.toLowerCase());
        console.log(`finished search with length ${filteredOptions.length}`);
        if (filteredOptions.length < 10) {
          console.log(filteredOptions);
        }
        setOptions(filteredOptions);
      } else {
        setOptions([]);
      }
    },
    [trie]
  );

  const handleOptionClick = (index, e) => {
    console.log(index);
    const tokens = inputValue.split(' ');
    tokens[tokens.length-1] = options[index];
    setInputValue(tokens.join(' '));
    setOptions([]);
  }
  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
      <ListItem
        style={style}
        sx={{
          paddingLeft: "30px"
        }}
        key={options[index]}
        component="div"
        disablePadding
      >
        <ListItemButton onClick={handleOptionClick.bind(null, index)}>
          <ListItemText primary={`${options[index]}`} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%"
      }}
    >
      <SearchContainer>
        <Box sx={{ p: "10px" }} aria-label="menu">
          <SearchIcon
            sx={{
              color: "grey.500"
            }}
          />
        </Box>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search ACCIO"
          inputProps={{ "aria-label": "search google maps" }}
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearchText(inputValue);
            }
          }}
          onChange={handleInputChange}
          autoFocus={true}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={onChooseMic}
        >
          <MicIcon />
        </IconButton>
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          component="label"
          role={undefined}
          tabIndex={-1}
        >
          <ImageIcon />
          <input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            accept="image/*"
            type="file"
            onChange={(e) => {
              console.log(
                e.target.files,
                e.target.files![0],
                e.target.files![0].path
              );
              onChooseImage(e.target.files![0].path);
            }}
          />
        </IconButton>
      </SearchContainer>
      <Box>
        <FixedSizeList
          height={150}
          itemSize={35}
          width={"100%"}
          itemCount={options.length}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </Box>
  );
}
