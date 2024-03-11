import React from "react";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { CustomDrawer, DrawerHeader } from "./AccioDrawer.styled";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import SettingsIcon from "@mui/icons-material/Settings";
import Logo from "../../assets/ACCIO.svg";

interface AccioDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const AccioDrawer: React.FC<AccioDrawerProps> = (props: AccioDrawerProps) => {
  const { open, handleDrawerClose } = props;
  const theme = useTheme();

  return (
    <CustomDrawer variant="permanent" open={open}>
      <DrawerHeader sx={{ display: "flex", justifyContent: "space-between" }}>
        <img alt="" src={Logo} width={100} height={50} />
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem key="Dashboard" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Search Mode" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search Mode" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Indexing Mode" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DocumentScannerIcon />
            </ListItemIcon>
            <ListItemText primary="Indexing Mode" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Settings" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </CustomDrawer>
  );
};

export default AccioDrawer;
