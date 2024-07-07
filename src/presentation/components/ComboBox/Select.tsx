import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";

interface CustomSelectProps {
  choices: string[];
  label: string;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ selectedValue, setSelectedValue, choices, label }) => {
  const theme = useTheme();
  return (
    <FormControl fullWidth sx={{ display: "flex" }}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={selectedValue}
        label={label}
        onChange={(event: SelectChangeEvent) => setSelectedValue(event.target.value as string)}
      >
        {choices.map((choice, index) => (
          <MenuItem key={index} value={choice} sx={{
            color: theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.primary.dark
          }}>
            {choice}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
