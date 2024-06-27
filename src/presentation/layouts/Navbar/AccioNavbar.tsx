import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CreateIcon from "@mui/icons-material/Create";
import {
  CustomAppBar
} from "./AccioNavbar.styled";
import MaterialUISwitch from "../../components/ToggleButton/ToggleButton.styled";
import {
  Button,
  Menu,
  MenuItem, useTheme
} from "@mui/material";
import { QueryEngines, useSearchContext } from "../../../application";
import { useState } from "react";

interface AccioNavbarProps {
  open: boolean;
  isLightMode: boolean;
  toggleLightMode: () => void;
}

export default function AccioNavbar(props: AccioNavbarProps) {
  const { open, isLightMode, toggleLightMode } = props;
  const { queryEngine, setQueryEngine } = useSearchContext();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <CustomAppBar position="fixed" open={open} sx={{
      zIndex: "999"
    }}>
      <Toolbar>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          sx={{
            m: 1,
            marginLeft: open ? 0 : "5rem",
            transition: "margin 0.3s ease-in-out",
            fontSize: "1rem"
          }}
        >
          <CreateIcon sx={{ mr: 1 }} />
          Query Engine: {queryEngine}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {Object.values(QueryEngines).map((engine) => (
            <MenuItem
              key={engine}
              onClick={() => {
                setQueryEngine(engine);
                handleClose();
              }}
              sx={{
                color: theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.primary.dark
              }}
            >
              {engine}
            </MenuItem>
          ))}
        </Menu>
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
