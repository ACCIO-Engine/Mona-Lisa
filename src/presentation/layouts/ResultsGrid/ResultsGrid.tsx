import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FilePreview from "../../components/FilePreview/FilePreview";
import { File } from "../../../application";

const ResultsGrid = ({ files }: { files: File[] }) => {
  return (
    <Box sx={{ width: "100%" }}>
      {files && (
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
          {files.map((file: File) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={file.path}>
              <FilePreview file={file} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ResultsGrid;
