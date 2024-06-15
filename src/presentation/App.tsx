import { globalStyles, mainTheme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React from "react";
import Index from "./pages/Index/Index";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./layouts/Root/Root";
import Results from "./pages/Results/Results";
import { useAppState } from "./contexts/AppContext";
import Home from "./pages/Home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardProvider from "./contexts/DashboardContext";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import GlobalStyles from "@mui/material/GlobalStyles";
import TrieProvider from "./contexts/TrieContext";
import SearchInput from "./components/SearchInput/SearchInput";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />
      },
      { path: "search", element: <Results /> },
      {
        path: "index",
        element: (
          <SnackbarProvider>
            <Index />
          </SnackbarProvider>
        )
      },
      { path: "dashboard", element: <Dashboard /> }
    ]
  }
]);

const App: React.FC = () => {
  const { isLightMode } = useAppState();
  console.log("isLightMode", isLightMode);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={mainTheme(isLightMode)}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles(isLightMode)} />
        <TrieProvider>
          <DashboardProvider>
            <RouterProvider router={router} />
          </DashboardProvider>
        </TrieProvider>
      </ThemeProvider>
    </QueryClientProvider>
    // <SearchInput />
  );
};

export default App;
