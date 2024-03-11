import {
  createTheme,
  responsiveFontSizes,
  type Theme,
} from "@mui/material/styles";

// Define your custom theme

const theme: Theme = responsiveFontSizes(
  createTheme({
    typography: {},
    palette: {
      mode: "light",
      primary: {
        main: "#0769AE",
        light: "#2EBEE3",
        dark: "#031F34",
        contrastText: "#fff",
      },
    },
  })
);

export default theme;
