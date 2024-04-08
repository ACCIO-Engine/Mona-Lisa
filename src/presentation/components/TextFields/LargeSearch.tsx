import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box, styled } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import ImageIcon from "@mui/icons-material/Image";

const SearchContainer = styled(Box)(({ theme }) => ({
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: "24px",
  border: `1px solid ${theme.palette.grey[300]}`
}));
export default function LargeSearch({
  onChooseImage,
  onSearchText,
  onChooseMic
}: {
  onChooseImage: (image: string) => void;
  onSearchText: (text: string) => void;
  onChooseMic: () => void;
}) {
  return (
    <SearchContainer>
      <Box sx={{ p: "10px" }} aria-label="menu">
        <SearchIcon
          sx={{
            color: "grey.500"
          }}
        />
      </Box>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search ACCIO"
        inputProps={{ "aria-label": "search google maps" }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearchText(e.currentTarget.value);
          }
        }}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={onChooseMic}
      >
        <MicIcon />
      </IconButton>
      <IconButton
        color="primary"
        sx={{ p: "10px" }}
        component="label"
        role={undefined}
        tabIndex={-1}
      >
        <ImageIcon />
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          accept="image/*"
          type="file"
          onChange={(e) => {
            console.log(
              e.target.files,
              e.target.files![0],
              e.target.files![0].path
            );
            onChooseImage(e.target.files![0].path);
          }}
        />
      </IconButton>
    </SearchContainer>
  );
}
