import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PathsGrid from "../../components/DataGrid/PathsGrid";
import IndexButtons from "../../components/IndexButtons/IndexButtons";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useAddDirs, useGetDirs, useRemoveDirs, useRemoveIgnoreDirs, useAddIgnoreDirs } from "../../../application";
import copyTextToClipboard from "../../utils/copy";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [selectedPaths, setSelectedPaths] = React.useState<string[]>([]);
  const [value, setValue] = React.useState(0);

  const { openSnackbar } = useSnackbar();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  const { mutate: addDirs } = useAddDirs()
  const { mutate: addIgnoreDirs } = useAddIgnoreDirs()
  const ipcRenderer = (window as any).ipcRenderer

  React.useEffect(() => {
    const handleSelectedDirs = (event: any, paths: string[], isCancelled: boolean) => {
      if (isCancelled) console.log('cancelled');
      else addDirs(paths);
    };

    const handleSelectedIgnoreDirs = (event: any, paths: string[], isCancelled: boolean) => {
      if (isCancelled) console.log('cancelled');
      else addIgnoreDirs(paths);
    };

    ipcRenderer.on('selected-dirs', handleSelectedDirs);
    ipcRenderer.on('selected-ignore-dirs', handleSelectedIgnoreDirs);

    return () => {
      ipcRenderer.removeListener('selected-dirs', handleSelectedDirs);
      ipcRenderer.removeListener('selected-ignore-dirs', handleSelectedIgnoreDirs);
    };
  }, [addDirs, addIgnoreDirs, ipcRenderer]);

  // buttons tasks
  const { mutate: removeDir } = useRemoveDirs()
  const handleRemoveDir = () => {
    removeDir(selectedPaths)
  }
  const { mutate: removeIgnoreDir } = useRemoveIgnoreDirs()
  const handleRemoveIgnoreDir = () => {
    removeIgnoreDir(selectedPaths)
  }

  const handleAddDirs = () => {
    ipcRenderer.send('open-select-dirs-dialog')
  }

  const handleAddIgnoreDirs = () => {
    ipcRenderer.send('open-select-ignore-dirs-dialog')
  }

  const handleCopy = () => {
    copyTextToClipboard(selectedPaths).then((success) => {
      if (success) {
        openSnackbar("Path copied to clipboard successfully", "success");
      } else {
        openSnackbar("Failed to copy path to clipboard", "error");
      }
    });
  };

  const { paths, isError, isLoading, isSuccess, error, status } = useGetDirs();
  console.log(paths, isError, isLoading, isSuccess, error, status);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Indexed" {...a11yProps(0)} />
          <Tab label="Ignored" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <IndexButtons handleAdd={handleAddDirs} handleCopy={handleCopy} handleRemove={handleRemoveDir} />
        <PathsGrid users={paths ? paths.dirsToCrawl : []} setSelectedPaths={setSelectedPaths} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <IndexButtons handleAdd={handleAddIgnoreDirs} handleCopy={handleCopy} handleRemove={handleRemoveIgnoreDir} />
        <PathsGrid users={paths ? paths.dirsToIgnore : []} setSelectedPaths={setSelectedPaths} />
      </CustomTabPanel>
    </Box>
  );
}
