import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { alpha } from "@mui/system";

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  textAlign: "center"
}));

export const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}));
export const ResultContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  background: `radial-gradient(circle, ${alpha(theme.palette.primary.main,0.3)} 0%, ${alpha(theme.palette.primary.main,0.1)} 100%)`,
  backdropFilter: "blur(20px)",
  minHeight: "65vh",
  borderRadius: "1rem",
  margin: "1rem",
  overflow: "auto"
}));

export const UploadButton = styled(Button)(({ theme }) => ({
  borderRadius: "2rem",
  padding: "1.25rem",
  margin: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}));

export const TextMessage = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  textAlign: "center",
  color: theme.palette.primary.contrastText
}));
