import { Checkbox, styled } from "@mui/material";

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.Mui-checked': {
    color: theme.palette.secondary.main,
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));