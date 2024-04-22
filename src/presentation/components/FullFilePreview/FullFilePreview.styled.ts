import { Box, styled } from "@mui/material";

export const FileContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  padding: theme.spacing(2),
  overflow: "auto"
}));
