import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  textAlign: "center",
}));

export const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}));

export const UploadButton = styled(Button)(({ theme }) => ({
  borderRadius: "2rem",
  padding: "1.25rem",
  margin: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));
