import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import showImagePath from "../utils/showImagePath";

export default function IndexButtons() {
  return (
    <Grid container columnSpacing={5} paddingBottom={2} alignItems={"center"}>
      <Grid item xs="auto">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
        >
          Add
          <input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            multiple
            onChange={(e) => {
              console.log(e.target.files);
              if (e.target.files === null) console.error("No file selected");
              else showImagePath("search-input", e.target.files[0].name);
            }}
            {...({ webkitdirectory: "true", directory: "true" } as any)}
          />
        </Button>
      </Grid>
      <Grid item xs="auto">
        <Button variant="contained">Remove</Button>
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
