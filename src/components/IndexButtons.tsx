import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export default function IndexButtons() {
  const ipcRenderer = (window as any).ipcRenderer
  ipcRenderer.on('selected-path', (event, path) => {
    console.log(path)
  });

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
          }}
        >
          Add
        </Button>
      </Grid>
      <Grid item xs="auto">
        <Button
          variant="contained"
          onClick={() => {
            ipcRenderer.send('open-select-path-dialog');
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
