import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CreateIcon from "@mui/icons-material/Create";
import {
  CustomAppBar
} from "./AccioNavbar.styled";
import {
  MaterialUISwitch,
  RerankContainer,
  RerankSwitch
} from "../../components/ToggleButton/ToggleButton.styled";
import {
  Button, FormControlLabel, IconButton,
  Menu,
  MenuItem, Tooltip, Typography,
  useTheme
} from "@mui/material";
import { QueryEngines, useSearchContext } from "../../../application";
import React, { useState } from "react";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

interface AccioNavbarProps {
  open: boolean;
  isLightMode: boolean;
  toggleLightMode: () => void;
}

export default function AccioNavbar(props: AccioNavbarProps) {
  const { open, isLightMode, toggleLightMode } = props;
  const { queryEngine, setQueryEngine, rerank, setRerank } = useSearchContext();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRerank = () => {
    setRerank((rerank: boolean) => !rerank);
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
          <FormControlLabel
            value="bottom"
            control={
              <RerankSwitch
                onChange={handleRerank}
                checked={!rerank}
              />
            }
            label={
              <Box>
                Rerank
                <Tooltip
                  title={<Typography>If enabled, the search results will be re-ranked to enhance
                    ranking. but it may take longer to get the results.</Typography>}
                >
                  <IconButton sx={{ p: 0 }}>
                    <InfoRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            labelPlacement="top"
            sx={{
              color: theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.primary.dark
            }}
          />
          <FormControlLabel
            value="bottom"
            control={
              <MaterialUISwitch
                onChange={toggleLightMode}
                checked={!isLightMode}
              />}
            label="Theme"
            labelPlacement="top"
            sx={{
              color: theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.primary.dark
            }}
          />

        </Box>
      </Toolbar>
    </CustomAppBar>
  );
}
