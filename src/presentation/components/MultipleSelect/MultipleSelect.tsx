import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

function getStyles(name: string, selectedValues: readonly string[], theme: Theme) {
  return {
    fontWeight:
      selectedValues.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

interface MultipleSelectChipProps {
  values: { [key: string]: boolean };
  onChange: (selectedValues: string[]) => void;
  label?: string;

  [key: string]: any;
}

const MultipleSelectChip: React.FC<MultipleSelectChipProps> = ({
                                                                 values,
                                                                 onChange,
                                                                 label = "Select",
                                                                 ...props
                                                               }) => {
  const theme = useTheme();
  const [selectedValues, setSelectedValues] = React.useState<string[]>(
    Object.keys(values).filter((name) => values[name])
  );
  console.log(Object.keys(values));
  const handleToggle = (value: string) => {
    const currentIndex = selectedValues.indexOf(value);
    const newSelectedValues = [...selectedValues];

    if (currentIndex === -1) {
      newSelectedValues.push(value);
    } else {
      newSelectedValues.splice(currentIndex, 1);
    }

    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  return (
    <FormControl {...props} sx={{ width: "100%" }}>
      {label && <Typography variant="body2">{label}</Typography>}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
          mt: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {Object.keys(values).map((name) => (
          <Chip
            key={name}
            label={name}
            onClick={() => handleToggle(name)}
            style={getStyles(name, selectedValues, theme)}
            sx={{
              color: theme.palette.common.white,
              backgroundColor:
                selectedValues.indexOf(name) === -1
                  ? theme.palette.grey[700]
                  : theme.palette.primary.main
            }}
          />
        ))}
      </Box>
    </FormControl>
  );
};

export default MultipleSelectChip;
