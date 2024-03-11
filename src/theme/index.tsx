import { createTheme, responsiveFontSizes, type Theme } from '@mui/material/styles'

// Define your custom theme

export const isDarkMode = false

const theme: Theme = responsiveFontSizes(
  createTheme({
    typography: {},
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#0769AE',
        light: '#2EBEE3',
        dark: '#031F34',
        contrastText: '#fff'
      }
    }
  })
)

export default theme
