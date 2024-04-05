import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ResultCard from "../../components/ResultCard/ResultCard";
import { useQuery } from "@tanstack/react-query";
import { searchImage } from "../../api/services";
import { useSearchParams } from "react-router-dom";

const ResultsGrid: React.FC = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams, searchParams.get("query"));
  const { data, isError, isLoading } = useQuery({
    queryKey: ["search"],
    queryFn: () => searchImage(searchParams.get("query") as string),
  });
  console.log(data, isError, isLoading);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {arr.map((i) => (
          <Grid item md={2} xs={4} key={i}>
            <ResultCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ResultsGrid;
