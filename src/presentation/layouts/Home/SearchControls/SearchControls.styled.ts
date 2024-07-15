import { styled, Box } from "@mui/material";

export const FieldContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "10px",
  // width: "100%",
  // [theme.breakpoints.up("md")]: {
  //   width: "70%",
  // },
  // [theme.breakpoints.up("lg")]: {
  //   width: "50%",
  // },
}));
