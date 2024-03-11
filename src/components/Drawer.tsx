import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import Settings from "../layouts/Settings";
import SettingsIcon from "@mui/icons-material/Settings";
import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const [mode, setMode] = React.useState("search");
  const handleSearchMode = () => {
    setMode("search");
  };

  const handleIndexingMode = () => {
    setMode("indexing");
  };

  const handleSettings = () => {
    setMode("settings");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ACCIO
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem key="Dashboard" disablePadding onClick={handleSearchMode}>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Search Mode" disablePadding onClick={handleSearchMode}>
            <ListItemButton>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search Mode" />
            </ListItemButton>
          </ListItem>
          <ListItem
            key="Indexing Mode"
            disablePadding
            onClick={handleIndexingMode}
          >
            <ListItemButton>
              <ListItemIcon>
                <DocumentScannerIcon />
              </ListItemIcon>
              <ListItemText primary="Indexing Mode" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Settings" disablePadding onClick={handleSettings}>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      {/* display Basic select or Customized input base based on mode */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {mode === "settings" && <Settings />}
      </Box>
    </Box>
  );
}
