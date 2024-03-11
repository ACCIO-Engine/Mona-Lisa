import {
  createTheme,
  responsiveFontSizes,
  type Theme,
} from "@mui/material/styles";

// Define your custom theme

export const lightTheme: Theme = responsiveFontSizes(
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

export const darkTheme: Theme = responsiveFontSizes(
  createTheme({
    typography: {},
    palette: {
      mode: "dark",
      primary: {
        main: "#0769AE",
        light: "#2EBEE3",
        dark: "#031F34",
        contrastText: "#fff",
      },
    },
  })
);
