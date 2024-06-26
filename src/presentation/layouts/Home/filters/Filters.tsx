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
  useTheme
} from "@mui/material";
import { useFiltersContext } from "../../../../application";
import MultipleSelectChip from "../../../components/MultipleSelect/MultipleSelect.tsx";

const FilterDialog = ({ open, onClose, onApply }) => {
  const {
    timeModified,
    setTimeModified,
    size,
    setSize,
    fileType,
    setFileType
  } = useFiltersContext();

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
        <MultipleSelectChip values={size} onChange={onFileSizeChange} label={"File Size"} />
        <MultipleSelectChip values={fileType} onChange={onFileTypeChange} label={"File Type"} />
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
