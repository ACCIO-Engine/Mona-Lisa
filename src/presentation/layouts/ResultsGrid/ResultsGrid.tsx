import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ResultCard from "../../components/ResultCard/ResultCard";
import { useSearchParams } from "react-router-dom";
import { useSearchImage } from "../../../application";

const ResultsGrid: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { files, isError, isLoading, isSuccess, error, status } =
    useSearchImage(searchParams.get("query") || "");
  console.log(files, isError, isLoading, isSuccess, error, status);
  return (
    <Box sx={{ width: "100%" }}>
      {files && (
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {files.map(
            (file: {
              path: string;
              name: string;
              score: number;
              pages: number[];
            }) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={file.path}>
                <ResultCard file={file} />
              </Grid>
            )
          )}
        </Grid>
      )}
    </Box>
  );
};

export default ResultsGrid;
