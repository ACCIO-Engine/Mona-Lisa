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
import { FileType, QueryEngines, useFiltersContext, useSearchContext } from "../../../application";
import React, { useState } from "react";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { CBIREngines } from "../../../application/types/QueryEngines.enum";
import { styled } from "@mui/material/styles";

interface AccioNavbarProps {
  open: boolean;
  isLightMode: boolean;
  toggleLightMode: () => void;
}

const EnginesContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "showVertical"
})<{ showVertical: boolean }>(({ theme, showVertical }) => ({
  display: "flex",
  flexDirection: showVertical ? "column" : "row",
  transition: "all 0.3s ease-in-out",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "row"
  }
}));

export default function AccioNavbar(props: AccioNavbarProps) {
  const { setFileType } = useFiltersContext();
  const { open, isLightMode, toggleLightMode } = props;
  const {
    queryEngine,
    setQueryEngine,
    cbirEngine,
    setCBIREngine,
    rerank,
    setRerank,
    showResults
  } = useSearchContext();
  const theme = useTheme();
  console.log("showResultsshowResults", showResults);
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
  };

  const handleCloseCBIR = () => {
    setCBIRAnchorEl(null);
  };

  const handleRerank = () => {
    setRerank((rerank: boolean) => !rerank);
  };
  return (
    <CustomAppBar position="fixed" open={open} sx={{
      zIndex: "999"
    }}>
      <Toolbar>
        <EnginesContainer showVertical={showResults}>

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
              fontSize: "1rem"
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
          <Box>
            <Button
              aria-controls="cbir-menu"
              aria-haspopup="true"
              onClick={handleCBIRClick}
              sx={{
                m: 1,
                transition: "margin 0.3s ease-in-out",
                fontSize: "1rem",
                marginLeft: showResults ? "5rem" : 0,
                [theme.breakpoints.down("lg")]: {
                  marginLeft: 0
                }
              }}
              startIcon={<CreateIcon sx={{ ml: 1 }} />}
            >
              CBIR Engine: {cbirEngine}
            </Button>
            <Tooltip
              title={<Typography>CBIR (reverse image search) disabled text query and return images
                similar to you image</Typography>}>
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
                    if (engine !== CBIREngines.NONE) {
                      setQueryEngine(QueryEngines.SEMANTIC_PASSAGE_EMBEDDINGS);
                      setFileType({
                        Image: true,
                        Text: false,
                        Video: false,
                        Audio: false
                      });
                    }
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
          </Box>
        </EnginesContainer>
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
  )
    ;
}
