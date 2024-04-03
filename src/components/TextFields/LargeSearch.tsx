import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import ImageIcon from "@mui/icons-material/Image";
export default function LargeSearch() {
  return (
    <Box
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderRadius: "24px",
        border: "1px solid #dfe1e5",
      }}
    >
      <Box sx={{ p: "10px" }} aria-label="menu">
        <SearchIcon />
      </Box>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Maps"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <MicIcon />
      </IconButton>
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
        <ImageIcon />
      </IconButton>
    </Box>
  );
}
