import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lightTheme, darkTheme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./layouts/Navbar/AccioNavbar";
import Drawer from "./components/Drawer/AccioDrawer";
import React from "react";
import { DrawerHeader } from "./components/Drawer/AccioDrawer.styled";
import Settings from "./layouts/Settings/Settings";
import DialogProvider from "../src/components/Dialog/Dialog";
import Root from "./layouts/Root/Root";
import Home from "./pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        // index is true to make it the default route
        index: true,
        element: <Home />,
      },
      // { path: "search", element: <Search /> },
      // { path: "index", element: <Index /> },
      // { path: "settings", element: <Settings /> },
    ],
  },
]);

function App(): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [isLightMode, setLightMode] = React.useState(true);
  const toggleLightMode = () => {
    setLightMode(!isLightMode);
  };

  return (
    <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
      <CssBaseline />

      <RouterProvider router={router} />
      <Box sx={{ display: "flex" }}>
        <DialogProvider>
          <Navbar
            open={open}
            handleDrawerOpen={handleDrawerOpen}
            isLightMode={isLightMode}
            toggleLightMode={toggleLightMode}
          />
        </DialogProvider>
        <Drawer
          open={open}
          handleDrawerClose={handleDrawerClose}
          isLightMode={isLightMode}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Settings />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
