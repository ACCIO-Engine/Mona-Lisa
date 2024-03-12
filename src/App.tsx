import { lightTheme, darkTheme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React from "react";
import Settings from "./layouts/Settings/Settings";
import Index from "./pages/Index/Index";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./layouts/Root/Root";
import Home from "./pages/Home/Home";
import { useAppState } from "./contexts/AppContext";

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
      { path: "settings", element: <Settings /> },
      { path: "search", element: <Home /> },
      { path: "index", element: <Index /> },
    ],
  },
]);

function App(): React.ReactElement {
  const { isLightMode } = useAppState();

  return (
    <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
