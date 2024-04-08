import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Fab, InputAdornment, TextField } from "@mui/material";

export default function InputDirectory() {
  return (
    <TextField
      fullWidth
      placeholder="Type a directory"
      inputProps={{ "aria-label": "Type a Directory" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={(e) => {
                  console.log(e.target.files);
                }}
              />
              <Fab
                sx={{ boxShadow: "none", backgroundColor: "white" }}
                size="small"
                component="span"
                aria-label="add"
              >
                <FolderOpenIcon />
              </Fab>
            </label>
          </InputAdornment>
        ),
      }}
    />
  );
}
