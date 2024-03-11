import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import PermanentDrawerLeft from "./components/Drawer";
import Navbar from "./layouts/Navbar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <PermanentDrawerLeft />
    </ThemeProvider>
  );
}

export default App;
