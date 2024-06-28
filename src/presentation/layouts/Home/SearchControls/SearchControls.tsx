import { useState } from "react";
import LargeSearch from "../../../components/TextFields/LargeSearch";
import { FieldContainer } from "./SearchControls.styled";
import { useNavigate } from "react-router-dom";
import {
  SearchType, useFiltersContext,
  useSearch, useSearchContext
} from "../../../../application";
import {
  Box, Button
} from "@mui/material";
import FilterDialog from "../filters/Filters.tsx";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SearchControls({
                                         searchCallback, clearResults,
                                         canClear
                                       }: {
  searchCallback: () => void,
  clearResults: () => void,
  canClear: boolean
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [currentControl, setCurrentControl] = useState<"text" | "mic">("text");
  const {
    setSearchByFileName,
    setFileType,
    setSize,
    setTimeModified
  } = useFiltersContext();
  const navigate = useNavigate();
  const { search } = useSearch();
  const { setPage } = useSearchContext();
  const onChooseImage = (image: string) => {
    search(image, SearchType.IMAGE);
    searchCallback();
    // navigate("/search");
  };
  const onSearchText = (text: string) => {
    search(text, SearchType.TEXT);
    searchCallback();
    // navigate("/search");
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
    size: {
      Empty: boolean,
      Tiny: boolean,
      Small: boolean,
      Medium: boolean,
      Large: boolean,
      Huge: boolean,
      Gigantic: boolean
    },
    fileType: {
      Image: boolean,
      Text: boolean,
      Video: boolean,
      Audio: boolean
    },
    searchByFileName: boolean
  }) => {
    console.log("Filters", filters);
    setTimeModified(filters.timeModified);
    setSize(filters.size);
    setFileType(filters.fileType);
    setSearchByFileName(filters.searchByFileName);
    setPage(1);
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
          width: "100%"
          // minHeight: "9rem"
        }}
      >
        {currentControl === "text" && (
          <LargeSearch
            onChooseImage={onChooseImage}
            onSearchText={onSearchText}
            onChooseMic={onChooseMic}
          />
        )}
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
        <Button
          variant="contained"
          onClick={clearResults}
          disabled={!canClear}
          sx={{
            padding: "0.6rem 0.7rem",
            textTransform: "none",
            letterSpacing: "0.05rem",
            fontSize: "1rem",
            marginLeft: "0.5rem"
          }}>
          <DeleteIcon />
          <span>Clear</span>
        </Button>
      </Box>
    </FieldContainer>
  );
}
