import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import copyTextToClipboard from "../../utils/copy";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useEffect, useState } from "react";
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "paths",
    headerName: "Paths",
    valueGetter: (params) => `${params.row.paths || ""}`,
    width: 150,
  },
];

const paths = [
  // create tuples of id, paths
  { id: 1, paths: "path1" },
  { id: 2, paths: "path2" },
  { id: 3, paths: "path3" },
];

interface GridProps {
  users: string[];
}
export default function PathsGrid(props: GridProps) {
  const { openSnackbar } = useSnackbar();

  const handleEvent: GridEventListener<"rowClick"> = (params) => {
    copyTextToClipboard(`${params.row.paths}`).then((success) => {
      if (success) {
        openSnackbar("Path copied to clipboard successfully", "success");
      } else {
        openSnackbar("Failed to copy path to clipboard", "error");
      }
    });
  };

  return (
    <Box sx={{ height: `calc(100vh - 270px)`, width: "100%" }}>
      <DataGrid
        scrollbarSize={10}
        rows={props.users.map((user, index) => ({ id: index, paths: user }))}
        columns={columns}
        disableRowSelectionOnClick
        checkboxSelection
        onRowDoubleClick={handleEvent}
        autoHeight={false}
        onRowSelectionModelChange={(newSelection) =>
          console.log(newSelection, "newSelection")
        }
      />
    </Box>
  );
}
