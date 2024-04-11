import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridEventListener, GridRowId } from "@mui/x-data-grid";
import copyTextToClipboard from "../../utils/copy";
import { useSnackbar } from "../../contexts/SnackbarContext";
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "paths",
    headerName: "Paths",
    valueGetter: (params) => `${params.row.paths || ""}`,
    flex: 1
  },
];

interface GridProps {
  users: string[];
  setSelectedPaths: (paths: string[]) => void;
}
export default function PathsGrid(props: GridProps) {
  const { openSnackbar } = useSnackbar();

  const handleEvent: GridEventListener<"rowClick"> = (params) => {
    copyTextToClipboard([params.row.paths]).then((success) => {
      if (success) {
        openSnackbar("Path copied to clipboard successfully", "success");
      } else {
        openSnackbar("Failed to copy path to clipboard", "error");
      }
    });
  };

  const handleSelect = (selectionModel: GridRowId[]) => {
    if (selectionModel.length > 0) {
      const selectedRows = selectionModel.map((rowId) => props.users[rowId as number]);
      props.setSelectedPaths(selectedRows);
    }
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
        onRowSelectionModelChange={handleSelect}
      />
    </Box>
  );
}
