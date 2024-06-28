import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme, FormControlLabel, Checkbox
} from "@mui/material";
import { useFiltersContext } from "../../../../application";
import MultipleSelectChip from "../../../components/MultipleSelect/MultipleSelect.tsx";
import { useState } from "react";

const FilterDialog = ({ open, onClose, onApply }) => {
  const {
    timeModified,
    size,
    fileType,
    searchByFileName
  } = useFiltersContext();
  const [localSearchByFileName, setSearchByFileName] = useState(searchByFileName);
  const [localTimeModified, setTimeModified] = useState(timeModified);
  const [localSize, setSize] = useState(size);
  const [localFileType, setFileType] = useState(fileType);

  const handleApply = () => {
    console.log({
      timeModified: localTimeModified,
      size: localSize,
      fileType: localFileType,
      searchByFileName: localSearchByFileName
    })
    onApply({
      timeModified: localTimeModified,
      size: localSize,
      fileType: localFileType,
      searchByFileName: localSearchByFileName
    });
    onClose();
  };

  const handleReset = () => {
    setTimeModified("");
    setSize({
      Empty: true,
      Tiny: true,
      Small: true,
      Medium: true,
      Large: true,
      Huge: true,
      Gigantic: true
    });
    setSearchByFileName(false);
    setFileType({
      Image: true,
      Text: true,
      Video: true,
      Audio: true
    });
  };
  const onFileSizeChange = (selectedValues: string[]) => {
    setSize({
      Empty: selectedValues.includes("Empty"),
      Tiny: selectedValues.includes("Tiny"),
      Small: selectedValues.includes("Small"),
      Medium: selectedValues.includes("Medium"),
      Large: selectedValues.includes("Large"),
      Huge: selectedValues.includes("Huge"),
      Gigantic: selectedValues.includes("Gigantic")
    });
  };
  const onFileTypeChange = (selectedValues: string[]) => {
    setFileType({
      Image: selectedValues.includes("Image"),
      Text: selectedValues.includes("Text"),
      Video: selectedValues.includes("Video"),
      Audio: selectedValues.includes("Audio")
    });
  };
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Filter Search</DialogTitle>
      <DialogContent>
        <FormControlLabel control={<Checkbox
          checked={localSearchByFileName}
          onChange={(e) => setSearchByFileName(e.target.checked)}
        />} label="Search By File Name" />

        <FormControl fullWidth margin="normal">
          <InputLabel
            id="time-modified-label"
            sx={{ color: theme.palette.common.white }}
          >Time Modified</InputLabel>
          <Select
            labelId="time-modified-label"
            value={timeModified}
            onChange={(e) => setTimeModified(e.target.value)}
            variant="standard"
            sx={{ color: theme.palette.common.white }}
          >
            {[
              "today",
              "yesterday",
              "this week",
              "last week",
              "this month",
              "last month",
              "last year",
              "this year"
            ].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <MultipleSelectChip values={localSize} onChange={onFileSizeChange} label={"File Size"} />
        <MultipleSelectChip values={localFileType} onChange={onFileTypeChange} label={"File Type"} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset} color="secondary">
          Reset
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleApply} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
