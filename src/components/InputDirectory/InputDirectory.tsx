import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Fab, InputAdornment, TextField } from "@mui/material";

export default function InputDirectory() {
  const ipcRenderer = (window as any).ipcRenderer
  ipcRenderer.on('selected-DBpath', (event, path: string) => {
    console.log(path)
  });

  return (
    <TextField
      fullWidth
      placeholder="Type a directory"
      inputProps={{ "aria-label": "Type a Directory" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <Fab
              sx={{ boxShadow: "none", backgroundColor: "white" }}
              size="small"
              component="span"
              aria-label="add"
              onClick={
                () => {
                  ipcRenderer.send('select-DBpath');
                }
              }
            >
              <FolderOpenIcon />
            </Fab>
          </InputAdornment>
        ),
      }}
    />
  );
}
