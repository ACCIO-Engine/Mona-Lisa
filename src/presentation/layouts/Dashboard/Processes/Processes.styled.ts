import { Box, styled, Typography } from "@mui/material";
import StepLabel from "@mui/material/StepLabel";
import { alpha } from "@mui/system";
import StepContent from "@mui/material/StepContent";

export const ColorlibStepIconRoot = styled(Box)<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundImage:
    `linear-gradient( 136deg, ${alpha(theme.palette.success.dark, 1)} 0%, ${alpha(theme.palette.success.dark, 0.7)} 50%, ${alpha(theme.palette.success.light, 0.7)} 100%)`,
  boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  zIndex: 1,
  color: theme.palette.common.white,
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ":hover": {
    cursor: "pointer"
  },
  ...(ownerState.active && {
    backgroundImage:
      `linear-gradient( 136deg, ${alpha(theme.palette.error.dark, 1)} 0%, ${alpha(theme.palette.error.dark, 0.7)} 50%, ${alpha(theme.palette.error.light, 0.7)} 100%)`,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  })
}));

export const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-labelContainer": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  "& .MuiStepLabel-label": {
    display: "flex",
    alignItems: "center",
    columnGap: theme.spacing(1),
    fontSize: "1.5rem"
  }
}));

export const StyledStepContent = styled(StepContent)(({ theme }) => ({
  borderLeft: `2px solid ${theme.palette.divider}`,
  marginLeft: theme.spacing(4)
}));

export const LogsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(1),
  background: "rgba(255, 255, 255, 0.32)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)",
  "-webkit-backdrop-filter": "blur(5px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: 3

}));
export const LogsTypography = styled(Typography)(({ theme }) => ({
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
  fontWeight: 400,
  maxHeight: 400,
  overflowY: "auto"
}));
