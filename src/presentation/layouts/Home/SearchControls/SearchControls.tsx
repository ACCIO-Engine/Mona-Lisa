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
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";
import FilterDialog from "../filters/filters";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
export default function SearchControls() {
  const { setQueryEngine } = useSearchContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [currentControl, setCurrentControl] = useState<"text" | "mic">("text");
  const [localQueryEngine, setLocalQueryEngine] = useState<QueryEngines>(
    QueryEngines.TFIDF
  );
  const navigate = useNavigate();
  const { search } = useSearch();
  const onChooseImage = (image: string) => {
    search(image, SearchType.IMAGE);
    setQueryEngine(localQueryEngine);
    navigate("/search");
  };
  const onSearchText = (text: string) => {
    search(text, SearchType.TEXT);
    setQueryEngine(localQueryEngine);
    navigate("/search");
  };
  const onChooseMic = () => {
    console.log("Choose Mic");
    setCurrentControl("mic");
  };
  const handleEngineChange = (event: SelectChangeEvent<string>) => {
    setLocalQueryEngine(event.target.value as QueryEngines);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleApplyFilters = (filters) => {
    console.log("Applied Filters:", filters);
    // You can handle the applied filters here
  };
  return (
    <FieldContainer>
      <FilterDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onApply={handleApplyFilters}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }}
      >
        {currentControl === "text" && (
          <LargeSearch
            onChooseImage={onChooseImage}
            onSearchText={onSearchText}
            onChooseMic={onChooseMic}
          />
        )}
        <FormControl sx={{ m: 1, width: "10rem" }}>
          <InputLabel id="demo-simple-select-helper-label">
            Query Engine
          </InputLabel>
          <Select
            value={localQueryEngine}
            label="Query Engine"
            onChange={handleEngineChange}
            variant="standard"
          >
            {Object.values(QueryEngines).map((engine) => (
              <MenuItem value={engine}>{engine}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton onClick={handleDialogOpen}>
          <FilterAltIcon />
        </IconButton>
      </Box>
    </FieldContainer>
  );
}
