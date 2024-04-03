import { Box, styled } from "@mui/material";

export const LogoContainer = styled(Box)(() => ({
  overflow: "hidden",
}));
export const HomeContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  overflow: "hidden",
}));

export const FieldContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "20px",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "70%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "50%",
  },
}));
