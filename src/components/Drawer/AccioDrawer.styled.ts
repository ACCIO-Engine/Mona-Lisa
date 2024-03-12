import { type CSSObject, type Theme } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import styled from "@mui/material/styles/styled";
import { List } from "@mui/material";

export const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const CustomDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  backgroundColor: "#03273c",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...((open ?? false) && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!(open ?? false) && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const StyledList = styled(List)({
  // selected and (selected + hover) states
  "&& .Mui-selected, && .Mui-selected:hover": {
    backgroundColor: "red",
    borderRight: "5px solid blue",
    "&, & .MuiListItemIcon-root": {
      color: "pink",
    },
  },
  // hover states
  "& .MuiListItemButton-root:hover": {
    backgroundColor: "orange",
    "&, & .MuiListItemIcon-root": {
      color: "yellow",
    },
  },
});
