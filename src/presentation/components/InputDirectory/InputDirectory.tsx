import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Fab, InputAdornment, TextField } from "@mui/material";

interface InputDirectoryProps {
  directory: string;
  setDirectory: (directory: string) => void;
}

export default function InputDirectory(props: InputDirectoryProps) {
  const handleSelectedDirs = (event: any, path: string, isCancelled: boolean) => {
    if (isCancelled) console.log('cancelled');
    else props.setDirectory(path);
  }

  const ipcRenderer = (window as any).ipcRenderer
  ipcRenderer.on('selected-DBpath', handleSelectedDirs);

  return (
    <TextField
      fullWidth
      placeholder="Type a directory"
      value={props.directory}
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
