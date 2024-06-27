import { Box, styled } from "@mui/material";

export const LogoContainer = styled(Box)(() => ({
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}));

export const HomeContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  overflow: "hidden",
}));

export const SearchControlsContainer = styled(Box)(({ theme }) => ({
  marginBottom: "2rem",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "70%"
  },
  [theme.breakpoints.up("lg")]: {
    width: "50%"
  }
}));


