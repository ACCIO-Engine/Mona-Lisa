import { MenuItem } from "@mui/material";
import styled from "@mui/material/styles/styled";

export const StyledMenuItem = styled(MenuItem)(() => ({
  paddingLeft: "4px",
  "& .MuiTypography-root": {
    paddingLeft: "8px",
  },
}));
