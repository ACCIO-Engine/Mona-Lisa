import { useState } from "react";
import LargeSearch from "../../../components/TextFields/LargeSearch";
import { FieldContainer } from "./SearchControls.styled";
import { useNavigate } from "react-router-dom";
import {
  SearchType,
  useSearch
} from "../../../../application";
import {
  Box, Button
} from "@mui/material";
import FilterDialog from "../filters/filters";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function SearchControls() {
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleApplyFilters = (filters: {
    timeModified: string,
    size: string,
    fileType: string[]
  }) => {
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
          alignItems: "start",
          justifyContent: "center",
          width: "100%",
          minHeight: "9rem"
        }}
      >
        {currentControl === "text" && (
          <LargeSearch
            onChooseImage={onChooseImage}
            onSearchText={onSearchText}
            onChooseMic={onChooseMic}
          />
        )}
        {/*<FormControl sx={{ m: 1, width: "10rem" }}>*/}
        {/*  <InputLabel id="demo-simple-select-helper-label">*/}
        {/*    Query Engine*/}
        {/*  </InputLabel>*/}
        {/*  <Select*/}
        {/*    value={localQueryEngine}*/}
        {/*    label="Query Engine"*/}
        {/*    onChange={handleEngineChange}*/}
        {/*    variant="standard"*/}
        {/*  >*/}
        {/*    {Object.values(QueryEngines).map((engine) => (*/}
        {/*      <MenuItem value={engine}>{engine}</MenuItem>*/}
        {/*    ))}*/}
        {/*  </Select>*/}
        {/*</FormControl>*/}
        <Button variant="contained" onClick={handleDialogOpen} sx={{
          padding: "0.6rem 0.7rem",
          textTransform: "none",
          letterSpacing: "0.05rem",
          fontSize: "1rem",
          marginLeft: "1rem"
        }}>
          <FilterAltIcon />
          <span>Filter</span>
        </Button>
      </Box>
    </FieldContainer>
  );
}
