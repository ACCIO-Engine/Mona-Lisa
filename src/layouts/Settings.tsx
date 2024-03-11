import React from "react";
import CustomSelect from "../components/Select";
import { Box } from "@mui/material";
import MaterialUISwitch from "../components/ToggleButton";

const Settings: React.FC = () => {
  return (
    <Box>
      <CustomSelect
        choices={["Classic", "Deep", "Mixed"]}
        label="Select Mode"
      />
      <CustomSelect
        choices={["Model1", "Model2", "Model3"]}
        label="Select Model"
      />
      <MaterialUISwitch sx={{ m: 1 }} defaultChecked />
    </Box>
  );
};

export default Settings;
