import { useState } from "react";
import LargeSearch from "../../../components/TextFields/LargeSearch";
import { FieldContainer } from "./SearchControls.styled";
import { useNavigate } from "react-router-dom";
import {
  QueryEngines,
  SearchType,
  useSearch,
  useSearchContext
} from "../../../../application";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";
export default function SearchControls() {
  const { queryEngine, setQueryEngine } = useSearchContext();
  const [currentControl, setCurrentControl] = useState<"text" | "mic">("text");
  const navigate = useNavigate();
  const { search } = useSearch();
  const onChooseImage = (image: string) => {
    search(image, SearchType.IMAGE);
    navigate("/search");
  };
  const onSearchText = (text: string) => {
    search(text, SearchType.TEXT);
    navigate("/search");
  };
  const onChooseMic = () => {
    console.log("Choose Mic");
    setCurrentControl("mic");
  };
  const handleEngineChange = (event: SelectChangeEvent<string>) => {
    setQueryEngine(event.target.value as QueryEngines);
  };
  return (
    <FieldContainer>
      {currentControl === "text" && (
        <LargeSearch
          onChooseImage={onChooseImage}
          onSearchText={onSearchText}
          onChooseMic={onChooseMic}
        />
      )}
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="demo-simple-select-helper-label">
          Query Engine
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={queryEngine}
          label="Query Engine"
          onChange={handleEngineChange}
        >
          {Object.values(QueryEngines).map((engine) => (
            <MenuItem value={engine}>{engine}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </FieldContainer>
  );
}
