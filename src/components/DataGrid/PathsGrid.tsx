import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import copyTextToClipboard from "../../utils/copy";
import { useSnackbar } from "../../contexts/SnackbarContext";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "paths",
    headerName: "Paths",
    valueGetter: (params) => `${params.row.paths || ""}`,
    width: 150,
  },
];

const rows = [
  // create tuples of id, paths
  { id: 1, paths: "path1" },
  { id: 2, paths: "path2" },
  { id: 3, paths: "path3" },
  { id: 4, paths: "path4" },
  { id: 5, paths: "path5" },
  { id: 6, paths: "path6" },
  { id: 7, paths: "path7" },
  { id: 8, paths: "path8" },
  { id: 9, paths: "path9" },
  { id: 10, paths: "path10" },
  { id: 11, paths: "path11" },
  { id: 12, paths: "path12" },
  { id: 13, paths: "path13" },
  { id: 14, paths: "path14" },
  { id: 15, paths: "path15" },
  { id: 16, paths: "path16" },
  { id: 17, paths: "path17" },
  { id: 18, paths: "path18" },
  { id: 19, paths: "path19" },
  { id: 20, paths: "path20" },
  { id: 21, paths: "path21" },
  { id: 22, paths: "path22" },
  { id: 23, paths: "path23" },
  { id: 24, paths: "path24" },
  { id: 25, paths: "path25" },
  { id: 26, paths: "path26" },
  { id: 27, paths: "path27" },
  { id: 28, paths: "path28" },
  { id: 29, paths: "path29" },
  { id: 30, paths: "path30" },
  { id: 31, paths: "path31" },
  { id: 32, paths: "path32" },
  { id: 33, paths: "path33" },
  { id: 34, paths: "path34" },
  { id: 35, paths: "path35" },
];

export default function PathsGrid() {
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
        rows={rows}
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
