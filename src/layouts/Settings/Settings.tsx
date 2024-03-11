import { Typography } from "@mui/material";
import CustomSelect from "../../components/Select";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function VariableWidthGrid() {
  return (
    <Box sx={{ flexGrow: 1 }} display={"flex"}>
      <Grid container rowSpacing={1} alignItems={"center"}>
        <Grid item xs={3}>
          <Typography>Select mode</Typography>
        </Grid>
        <Grid item xs={7}>
          <CustomSelect
            label="mode"
            choices={["Classic", "Deep", "Mixed"]}
          ></CustomSelect>
        </Grid>
        <Grid item xs={3}>
          <Typography>Select text model</Typography>
        </Grid>
        <Grid item xs={7}>
          <CustomSelect
            label="Select text model"
            choices={["Model1", "Model2", "Model3"]}
          ></CustomSelect>
        </Grid>
        <Grid item xs={3}>
          <Typography>Select image model</Typography>
        </Grid>
        <Grid item xs={7}>
          <CustomSelect
            label="Select image model"
            choices={["Model1", "Model2", "Model3"]}
          ></CustomSelect>
        </Grid>
        <Grid item xs={3}>
          <Typography>Select video model</Typography>
        </Grid>
        <Grid item xs={7}>
          <CustomSelect
            label="Select video model"
            choices={["Model1", "Model2", "Model3"]}
          ></CustomSelect>
        </Grid>
      </Grid>
    </Box>
  );
}
