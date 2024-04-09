import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

interface IndexButtonsProps {
  handleRemove: () => void;
  handleCopy: () => void;
  handleAdd: () => void;
}

export default function IndexButtons(props: IndexButtonsProps) {
  const { handleCopy, handleRemove, handleAdd } = props;

  return (
    <Grid container columnSpacing={5} paddingBottom={2} alignItems={"center"}>
      <Grid item xs="auto">
        <Button variant="contained" onClick={handleAdd}>ِAdd</Button>
      </Grid>
      <Grid item xs="auto">
        <Button variant="contained" onClick={handleRemove}>Remove</Button>
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
