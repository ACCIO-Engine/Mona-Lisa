import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import {
  CustomAppBar
} from "./AccioNavbar.styled";
import MaterialUISwitch from "../../components/ToggleButton/ToggleButton.styled";

interface AccioNavbarProps {
  open: boolean;
  isLightMode: boolean;
  toggleLightMode: () => void;
}

export default function AccioNavbar(props: AccioNavbarProps) {
  const { open, isLightMode, toggleLightMode } = props;
  return (
    <CustomAppBar position="fixed" open={open}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { md: "flex" } }}>
          <MaterialUISwitch
            sx={{ m: 1 }}
            onChange={toggleLightMode}
            checked={!isLightMode}
          />
        </Box>
      </Toolbar>
    </CustomAppBar>
  );
}
