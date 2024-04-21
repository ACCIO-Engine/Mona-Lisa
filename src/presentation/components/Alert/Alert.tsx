import { Alert, Box, LinearProgress, styled } from "@mui/material";

const BaseAlert = styled(Alert)({
  "&.MuiPaper-root": {
    justifyContent: "center"
  }
});
export function InfoAlert({ message }: { message: string }) {
  return <BaseAlert severity="info">{message}</BaseAlert>;
}

export function LoadingAlert({ message }: { message: string }) {
  return (
    <Box>
      <LinearProgress color="secondary" />
      <BaseAlert severity="info">{message}</BaseAlert>
    </Box>
  );
}

export function ErrorAlert({ message }: { message: string }) {
  return <BaseAlert severity="error">{message}</BaseAlert>;
}
