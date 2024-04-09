import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useAddDirs } from "../../../application";
import { useEffect, useState } from "react";

export default function IndexButtons() {
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
        <Button variant="contained">Copy</Button>
      </Grid>
    </Grid>
  );
}
