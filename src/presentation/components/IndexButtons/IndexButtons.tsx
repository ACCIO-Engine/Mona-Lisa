import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useAddDirs } from "../../../application";
import { useEffect, useState } from "react";
import copyTextToClipboard from "../../utils/copy";
import { useSnackbar } from "../../contexts/SnackbarContext";

interface IndexButtonsProps {
  selectedPaths: string[];
}

export default function IndexButtons(props: IndexButtonsProps) {
  const { openSnackbar } = useSnackbar();
  const [path, setPath] = useState<string[]>([]);
  const { mutate: addDirs } = useAddDirs()
  const ipcRenderer = (window as any).ipcRenderer
  ipcRenderer.on('selected-path', (event, path: string[]) => {
    console.log(path)
    setPath(path)
  });

  useEffect(() => {
    addDirs(path)
  }, [path])

  const handleCopy = () => {
    copyTextToClipboard(props.selectedPaths).then((success) => {
      if (success) {
        openSnackbar("Path copied to clipboard successfully", "success");
      } else {
        openSnackbar("Failed to copy path to clipboard", "error");
      }
    });
  };

  return (
    <Grid container columnSpacing={5} paddingBottom={2} alignItems={"center"}>
      <Grid item xs="auto">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          id="add-path"
          onClick={() => {
            ipcRenderer.send('open-select-path-dialog');
            addDirs(path)
          }}
        >
          Add
        </Button>
      </Grid>
      <Grid item xs="auto">
        <Button
          variant="contained"
          onClick={() => {

          }}
        >
          Remove
        </Button>
      </Grid>
      <Grid item xs="auto">
        <Button variant="contained">Swap</Button>
      </Grid>
      <Grid item xs="auto">
        <Button variant="contained" onClick={handleCopy}>Copy</Button>
      </Grid>
    </Grid>
  );
}
