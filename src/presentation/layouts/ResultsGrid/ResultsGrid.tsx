import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FilePreview from "../../components/FilePreview/FilePreview";
import { File, useSearchContext } from "../../../application";
import { MenuItem, Pagination, useTheme } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";

const ResultsGrid = ({ files, totalResults, totalPages }: {
  files: File[],
  totalResults: number,
  totalPages: number
}) => {
  const theme = useTheme();
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
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem"
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
                {
                  [5, 10, 15, 20].map((size) => (
                    <MenuItem
                      sx={{
                        color: theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.primary.dark
                      }}
                      key={size}
                      value={size}>{size}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <Pagination
              count={Math.ceil(totalPages)}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          </Box>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
            {files.map((file: File) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={file.path}>
                <FilePreview file={file} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ResultsGrid;
