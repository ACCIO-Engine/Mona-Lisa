import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CreateIcon from "@mui/icons-material/Create";
import {
  CustomAppBar
} from "./AccioNavbar.styled";
import {
  MaterialUISwitch,
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
import { CBIREngines } from "../../../application/types/QueryEngines.enum";

interface AccioNavbarProps {
  open: boolean;
  isLightMode: boolean;
  toggleLightMode: () => void;
}

export default function AccioNavbar(props: AccioNavbarProps) {
  const { open, isLightMode, toggleLightMode } = props;
  const { queryEngine, setQueryEngine, cbirEngine, setCBIREngine, rerank, setRerank } = useSearchContext();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cbirAnchorEl, setCBIRAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCBIRClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCBIRAnchorEl(event.currentTarget);
  }

  const handleCloseCBIR = () => {
    setCBIRAnchorEl(null);
  }

  const handleRerank = () => {
    setRerank((rerank: boolean) => !rerank);
  };
  return (
    <CustomAppBar position="fixed" open={open} sx={{
      zIndex: "999"
    }}>
      <Toolbar>
        <Button
          id="query-engine-button"
          disabled={cbirEngine !== CBIREngines.NONE}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          sx={{
            m: 1,
            marginLeft: open ? 0 : "5rem",
            transition: "margin 0.3s ease-in-out",
            fontSize: "1rem",
            backgroundColor: cbirEngine !== CBIREngines.NONE ? theme.palette.primary.light : theme.palette.primary.dark,
          }}
          startIcon={<CreateIcon sx={{ ml: 1 }} />}
        >
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

        <Button
          aria-controls="cbir-menu"
          aria-haspopup="true"
          onClick={handleCBIRClick}
          sx={{
            m: 1,
            marginLeft: open ? 0 : "1rem",
            transition: "margin 0.3s ease-in-out",
            fontSize: "1rem",
          }}
          startIcon={<CreateIcon sx={{ ml: 1 }} />}
        >
          CBIR Engine: {cbirEngine}
        </Button>
        <Tooltip title={<Typography>CBIR (reverse image search) disabled text query and return images similar to you image"</Typography>}>
          <IconButton sx={{ p: 0 }}>
            <InfoRoundedIcon sx={{ fontSize: "1.25rem" }} />
          </IconButton>
        </Tooltip>
        <Menu
          id="cbir-menu"
          anchorEl={cbirAnchorEl}
          keepMounted
          open={Boolean(cbirAnchorEl)}
          onClose={handleCloseCBIR}
        >
          {Object.values(CBIREngines).map((engine) => (
            <MenuItem
              key={engine}
              onClick={() => {
                setCBIREngine(engine);
                handleCloseCBIR();
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
                checked={rerank}
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
                    <InfoRoundedIcon sx={{ fontSize: "1.25rem" }} />
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
