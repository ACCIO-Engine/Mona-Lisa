import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FilePreview from "../../components/FilePreview/FilePreview";
import { File, useSearch } from "../../../application";

const ResultsGrid: React.FC = () => {
  const { files, isError, isLoading, isSuccess, error, status } = useSearch();
  console.log(files, isError, isLoading, isSuccess, error, status);
  return (
    <Box sx={{ width: "100%" }}>
      {files && (
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {files.map((file: File) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={file.path}>
              <FilePreview file={file} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ResultsGrid;
