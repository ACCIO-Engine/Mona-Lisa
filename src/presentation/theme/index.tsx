import {
  createTheme,
  responsiveFontSizes,
  type Theme
} from "@mui/material/styles";
import "@fontsource/barlow"; // Defaults to weight 400
import "@fontsource/barlow/400.css"; // Specify weight
import "@fontsource/barlow/400-italic.css"; // Specify weight and style

export const mainTheme = (mode: boolean): Theme => (mode ? lightTheme : darkTheme);

const darkTheme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: "Barlow"
    },
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
        light: "#2EBEE3",
        dark: "#031F34",
        contrastText: "#fff"
      },
      secondary: {
        main: "#031F34",
        light: "#2EBEE3",
        dark: "#031F34",
        contrastText: "#fff"
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: "white", // Add your desired color
            backgroundColor: "#031F34", // Add your desired background color
            "&:hover": {
              backgroundColor: "#2EBEE3" // Add your desired hover color
            }
          }
        }
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Change the background color of the menu
            backdropFilter: "blur(10px)", // Apply a blur effect to the content behind the menu
            WebkitBackdropFilter: "blur(10px)", // For Safari
            borderRadius: "10px", // Round the corners of the menu
            color: "#031F34" // Change the text color
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)" // Change the background color when hovering over a menu item
            },
            color: "white",
            fontWeight: "bold"
          }
        }
      },
      MuiModal: {
        styleOverrides: {
          root: {
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
            "& .MuiPaper-root": {
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Change the background color of the modal
              backdropFilter: "blur(30px)", // Apply a blur effect to the content behind the modal
              WebkitBackdropFilter: "blur(30px)", // For Safari
              borderRadius: "10px", // Round the corners of the modal
              color: "white", // Change the text color
              padding: "20px" // Add padding
            },
            "& .MuiDialogTitle-root": {
              textAlign: "center" // Center the title
            }
          }
        }
      }
    }
  })
);

const lightTheme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: "Barlow"
    },
    palette: {
      mode: "light",
      primary: {
        main: "#031F34",
        light: "#2EBEE3",
        dark: "#031F34",
        contrastText: "#fff"
      },
      secondary: {
        main: "#fff",
        light: "#2EBEE3",
        dark: "#031F34",
        contrastText: "#fff"
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: "white", // Add your desired color
            backgroundColor: "#031F34", // Add your desired background color
            "&:hover": {
              backgroundColor: "#2390a9" // Add your desired hover color
            }
          }
        }
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Change the background color of the menu
            backdropFilter: "blur(10px)", // Apply a blur effect to the content behind the menu
            WebkitBackdropFilter: "blur(10px)", // For Safari
            borderRadius: "10px", // Round the corners of the menu
            color: "white" // Change the text color
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)" // Change the background color when hovering over a menu item
            },
            color: "white",
            fontWeight: "bold"
          }
        }
      },
      MuiModal: {
        styleOverrides: {
          root: {
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
            "& .MuiPaper-root": {
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Change the background color of the modal
              backdropFilter: "blur(30px)", // Apply a blur effect to the content behind the modal
              WebkitBackdropFilter: "blur(30px)", // For Safari
              borderRadius: "10px", // Round the corners of the modal
              color: "white", // Change the text color
              padding: "20px" // Add padding,
            },

            "& .MuiDialogTitle-root": {
              textAlign: "center" // Center the title
            }
          }
        }
      }
    }
  })
);

export const globalStyles = (mode: boolean) =>
  mode ? lightGlobalStyles : darkGlobalStyles;


const lightGlobalStyles = {
  body: {
    height: "100vh",
    backgroundSize: "100% 100%",
    backgroundPosition: "0px 0px,0px 0px,0px 0px,0px 0px,0px 0px",
    backgroundImage: "radial-gradient(49% 81% at 45% 47%, #BAEAF8 9%, #073AFF00 100%),radial-gradient(113% 91% at 17% -2%, #FFFFFFFF 0%, #FF000000 2%),radial-gradient(142% 91% at 83% 7%, #E2F8FFFF 2%, #FFF6F600 99%),radial-gradient(142% 91% at -6% 74%, #FFFFFFFF 22%, #DEF7FFFF 87%),radial-gradient(142% 91% at 111% 84%, #FFFFFFFF 0%, #FFFFFF42 100%)",
    scrollbarColor: "#2EBEE3 #FFFFFF",
    scrollbarWidth: "thin"
  },
  "::-webkit-scrollbar": {
    width: "12px"
  },
  "::-webkit-scrollbar-track": {
    background: "#FFFFFF"
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#2EBEE3",
    borderRadius: "10px",
    border: "3px solid #FFFFFF"
  }
};

const darkGlobalStyles = {
  body: {
    height: "100vh",
    background: "rgba(186,234,248,0.65)",
    WebkitBackdropFilter: "blur(41px)",
    backdropFilter: "blur(41px)",
    backgroundSize: "100% 100%",
    backgroundPosition: "0px 0px,0px 0px,0px 0px,0px 0px,0px 0px",
    backgroundImage: "radial-gradient(49% 81% at 45% 47%, #4379A1FF 9%, #08344FFF 100%),radial-gradient(113% 91% at 17% -2%, #FFFFFFFF 0%, #FF000000 2%),radial-gradient(142% 91% at 83% 7%, #044372FF 2%, #285B81FF 99%),radial-gradient(142% 91% at -6% 74%, #FFFFFFFF 22%, #08344f 87%),radial-gradient(142% 91% at 111% 84%, #FFFFFFFF 0%, #FFFFFF42 100%)",
    scrollbarColor: "#2EBEE3 #031F34",
    scrollbarWidth: "thin"
  },
  "::-webkit-scrollbar": {
    width: "12px"
  },
  "::-webkit-scrollbar-track": {
    background: "#031F34"
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#2EBEE3",
    borderRadius: "10px",
    border: "3px solid #031F34"
  }
};