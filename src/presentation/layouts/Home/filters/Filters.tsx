import React, { useState } from "react";
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
  Checkbox,
  FormControlLabel,
  FormGroup, FormLabel
} from "@mui/material";
import { useFiltersContext } from "../../../../application";
import { StyledCheckbox } from "./Filters.styled.ts";

const FilterDialog = ({ open, onClose, onApply }) => {
  const {
    timeModified,
    setTimeModified,
    size,
    setSize,
    fileType,
    setFileType
  } = useFiltersContext();

  const handleFileTypeChange = (event) => {
    setFileType({
      ...fileType,
      [event.target.name]: event.target.checked
    });
  };

  const handleApply = () => {
    onApply({
      timeModified,
      size,
      fileType: Object.keys(fileType).filter((key) => fileType[key])
    });
    onClose();
  };

  const handleReset = () => {
    setTimeModified("");
    setSize("");
    setFileType({
      Image: false,
      Document: false,
      Video: false,
      All: false
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Filter Search</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel id="time-modified-label">Time Modified</InputLabel>
          <Select
            labelId="time-modified-label"
            value={timeModified}
            onChange={(e) => setTimeModified(e.target.value)}
            variant="standard"
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
        <FormControl fullWidth margin="normal">
          <InputLabel id="size-label">Size</InputLabel>
          <Select
            labelId="size-label"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            variant="standard"
          >
            {[
              "Empty (0 KB)",
              "Tiny (0 - 16 KB)",
              "Small (16 KB - 1 MB)",
              "Medium (1 - 128 MB)",
              "Large (128 MB - 1 GB)",
              "Huge (1 - 4 GB)",
              "Giantic (>4 GB)"
            ].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl component="fieldset" margin="normal"
                     sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <FormLabel component="legend">File Types</FormLabel>
          <FormGroup row>
            {["Image", "Text", "Video", "Audio"].map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <StyledCheckbox
                    checked={fileType[type]}
                    onChange={handleFileTypeChange}
                    name={type}
                  />
                }
                label={type}
              />
            ))}
          </FormGroup>
        </FormControl>
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
