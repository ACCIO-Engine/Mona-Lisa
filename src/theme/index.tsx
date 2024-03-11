import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";

// Define your custom theme

export const isDarkMode = false;

const theme: Theme = responsiveFontSizes(
  createTheme({
    typography: {},
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  })
);

export default theme;
