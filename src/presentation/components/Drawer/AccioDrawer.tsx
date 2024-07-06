import React from "react";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { CustomDrawer } from "./AccioDrawer.styled";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import FullLogo from "../../assets/full.svg?react";
import LightLogo from "../../assets/LightACCIO.svg";
import DarkLogo from "../../assets/DarkACCIO.svg";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import routes from "../../routes/routes";
import { List } from "@mui/material";
import BiotechRoundedIcon from '@mui/icons-material/BiotechRounded';
interface AccioDrawerProps {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  isLightMode: boolean;
}

interface NavLinkItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  buttonProps: {
    selected: boolean;
    onClick: () => void;
  };
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({ to, icon, text, buttonProps }) => {
  return (
    <Link to={to} style={{ color: "inherit", textDecoration: "none" }}>
      <ListItem key={text} disablePadding>
        <ListItemButton {...buttonProps}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

const AccioDrawer: React.FC<AccioDrawerProps> = (props: AccioDrawerProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const buttonProps = (value: number) => ({
    selected: selectedIndex === value,
    onClick: () => {
      setSelectedIndex(value);
    }
  });

  const { open, handleDrawerOpen, handleDrawerClose, isLightMode } = props;
  return (
    <CustomDrawer variant="permanent" open={open}>
      <IconButton sx={
        {
          width: "fit-content",
          marginX: "auto"
        }
      } onClick={open ? handleDrawerClose : handleDrawerOpen}>
        {
          !open ? <FullLogo width={50} height={50} /> : isLightMode ?
            <img src={LightLogo} alt="Light Logo" width={100} height={50} /> :
            <img src={DarkLogo} alt="Dark Logo" width={100} height={50} />
        }
      </IconButton>
      <Divider />
      <List>
        <NavLinkItem
          to={routes.home}
          icon={<HomeIcon color={"primary"} />}
          text="Home"
          buttonProps={buttonProps(1)}
        />
        <NavLinkItem
          to={routes.dashboard}
          icon={<DashboardIcon color={"primary"} />}
          text="Dashboard"
          buttonProps={buttonProps(0)}
        />
        <NavLinkItem
          to={routes.index}
          icon={<DocumentScannerIcon color={"primary"} />}
          text="Indexing"
          buttonProps={buttonProps(3)}
        />
        <NavLinkItem
          to={routes.testFiles}
          icon={<BiotechRoundedIcon color={"primary"} />}
          text="Test Files"
          buttonProps={buttonProps(2)}
        />
      </List>
    </CustomDrawer>
  );
};

export default AccioDrawer;
