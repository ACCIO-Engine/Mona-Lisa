import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface CustomSelectProps {
  choices: string[];
  label: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ choices, label }) => {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
  };


  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select labelId="select-label" id="select" value={selectedValue} label={label} onChange={handleChange}>
        {choices.map((choice, index) => (
          <MenuItem key={index} value={index}>
            {choice}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
