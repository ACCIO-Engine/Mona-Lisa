import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FilePreview from "../../components/FilePreview/FilePreview";
import { File, useSearchContext } from "../../../application";
import { MenuItem, Pagination, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";

const ResultsGrid = ({ files }: { files: File[] }) => {
  const { pageSize, setPageSize, page, setPage } = useSearchContext();
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<string>) => {
    setPageSize(parseInt(event.target.value));
  };
  return (
    <Box sx={{ width: "100%" }}>
      {files && (
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"

        }}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
            {files.map((file: File) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={file.path}>
                <FilePreview file={file} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem"
          }}>
            <FormControl size="small" sx={{
              minWidth: 80
            }}>
              <InputLabel id="demo-select-small-label">Page Size</InputLabel>
              <Select
                labelId="demo-select-small-label"
                value={pageSize.toString()}
                label="Page Size"
                onChange={handlePageSizeChange}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
            <Pagination
              count={Math.ceil(files.length / pageSize)}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ResultsGrid;
