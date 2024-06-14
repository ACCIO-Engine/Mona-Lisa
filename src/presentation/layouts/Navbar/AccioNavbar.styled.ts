import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import AppBar, { type AppBarProps } from "@mui/material/AppBar";
import { drawerWidth } from "../../components/Drawer/AccioDrawer.styled";

interface CustomAppBarProps extends AppBarProps {
  open?: boolean;
}

export const CustomAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})<CustomAppBarProps>(({ theme, open }) => ({
  backgroundImage: "none",
  backgroundColor: "transparent",
  boxShadow: "none",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    backgroundColor: "transparent",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));
