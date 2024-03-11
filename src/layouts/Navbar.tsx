import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CustomizedInputBase from "../components/Search";
import NestedList from "../components/NestedList";
import { drawerWidth } from "../components/Drawer";

const Navbar: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)` }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <CustomizedInputBase />
        <NestedList />
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
