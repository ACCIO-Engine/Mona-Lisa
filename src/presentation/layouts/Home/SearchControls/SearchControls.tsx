import { useState } from "react";
import LargeSearch from "../../../components/TextFields/LargeSearch";
import { FieldContainer } from "./SearchControls.styled";
// import { useNavigate } from "react-router-dom";
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
import { Dayjs } from "dayjs";
import { CBIREngines } from "../../../../application/types/QueryEngines.enum.ts";
import ImageIcon from "@mui/icons-material/Image";


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
    setTimeModified,
    setEndDate,
    setStartDate
  } = useFiltersContext();
  // const navigate = useNavigate();
  const { search } = useSearch();
  const { setPage } = useSearchContext();
  
  const onChooseImage = (image: string, cbirEngine: CBIREngines = CBIREngines.NONE) => {
    search(image, SearchType.IMAGE, cbirEngine);
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
    searchByFileName: boolean,
    startDate: Dayjs,
    endDate: Dayjs
  }) => {
    console.log("Filters", filters);
    setTimeModified(filters.timeModified);
    setSize(filters.size);
    setFileType(filters.fileType);
    setSearchByFileName(filters.searchByFileName);
    setPage(1);
    setStartDate(filters.startDate);
    setEndDate(filters.endDate);
  };

  const { cbirEngine } = useSearchContext();
=  const ipcRenderer = (window as any).ipcRenderer

  return (
    <FieldContainer>
      <FilterDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onApply={handleApplyFilters}
        cbirEngine={cbirEngine}
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
        {currentControl === "text" && cbirEngine === CBIREngines.NONE && (
          <LargeSearch
            onChooseImage={onChooseImage}
            onSearchText={onSearchText}
            onChooseMic={onChooseMic}
          />
        )}
        {cbirEngine !== CBIREngines.NONE &&
          (
            <Button
              variant="contained"
              onClick={() => {
                ipcRenderer.send("open-select-image-dialog");
                ipcRenderer.on("selected-image-path", (event: any, path: string) => {
                  onChooseImage(path, cbirEngine);
                });
              }}
              disabled={canClear}
              sx={{
                padding: "0.6rem 0.7rem",
                textTransform: "none",
                letterSpacing: "0.05rem",
                fontSize: "1rem",
                marginLeft: "0.5rem"
              }}
              startIcon={<ImageIcon />}
            >
              <span>select image</span>
            </Button>
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
    </FieldContainer >
  );
}
