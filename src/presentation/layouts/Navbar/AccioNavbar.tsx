import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import ImageIcon from "@mui/icons-material/Image";
import {
  CustomAppBar,
  Search,
  SearchIconWrapper,
  StyledInputBase
} from "./AccioNavbar.styled";
import { Fab } from "@mui/material";
import MaterialUISwitch from "../../components/ToggleButton/ToggleButton.styled";
import { useDialog } from "../../components/Dialog/Dialog";
import showImagePath from "../../utils/showImagePath";
import NestedList from "../../components/NestedList/NestedList";
import { SearchType, useSearch, useSearchContext } from "../../../application";
import { useNavigate } from "react-router-dom";
import routes from "../../routes/routes";
interface AccioNavbarProps {
  open: boolean;
  handleDrawerOpen: () => void;
  isLightMode: boolean;
  toggleLightMode: () => void;
}

export default function AccioNavbar(props: AccioNavbarProps) {
  const { search } = useSearch();
  const { searchString } = useSearchContext();
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  // route change
  const navigate = useNavigate();
  React.useEffect(() => {
    setSearchQuery(searchString);
    navigate(routes.search);
  }, [searchString, navigate]);
  const handleSearch = (query: string) => {
    search(query, SearchType.TEXT);
  };
  const ipcRenderer = (window as any).ipcRenderer;

  ipcRenderer.on("selected-image-path", (event, imageName: string) => {
    showImagePath("search-input", imageName);
  });

  const { open, handleDrawerOpen, isLightMode, toggleLightMode } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = (): void => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const showDialog = useDialog();

  const handleShowDialog = async () => {
    const confirmed = await showDialog({
      title: "Custom Dialog",
      message: "Custom message..."
    });
    if (confirmed) {
      console.log("confirmed");
    } else {
      console.log("canceled");
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <CustomAppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" })
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Accio
          </Typography> */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              id="search-input"
              value={searchQuery}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e.currentTarget.value as string);
                }
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>
          <Fab
            color="primary"
            size="small"
            component="span"
            aria-label="add"
            onClick={() => {
              ipcRenderer.send("open-select-image-dialog");
            }}
          >
            <ImageIcon />
          </Fab>
          <NestedList></NestedList>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <MaterialUISwitch
              sx={{ m: 1 }}
              onChange={toggleLightMode}
              checked={!isLightMode}
            />
            <IconButton size="large" color="inherit" onClick={handleShowDialog}>
              <SettingsIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </CustomAppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}
