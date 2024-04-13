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
import { useQueryClient } from "@tanstack/react-query";
import Settings from "../../layouts/Settings/Settings";
import { Button } from "@mui/material";
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
  const queryClient = useQueryClient();
  const { mutate: addDirs } = useAddDirs(queryClient)
  const { mutate: addIgnoreDirs } = useAddIgnoreDirs(queryClient)
  const { mutate: removeDir } = useRemoveDirs(queryClient)
  const { mutate: removeIgnoreDir } = useRemoveIgnoreDirs(queryClient)
  const { paths } = useGetDirs();

  const ipcRenderer = (window as any).ipcRenderer

  const handleSelectedDirs = React.useCallback((event: any, paths: string[], isCancelled: boolean) => {
    if (isCancelled) console.log('cancelled');
    else addDirs(paths);
  }, [addDirs]);

  const handleSelectedIgnoreDirs = React.useCallback((event: any, paths: string[], isCancelled: boolean) => {
    if (isCancelled) console.log('cancelled');
    else addIgnoreDirs(paths);
  }, [addIgnoreDirs]);

  React.useEffect(() => {
    ipcRenderer.on('selected-dirs', handleSelectedDirs);
    ipcRenderer.on('selected-ignore-dirs', handleSelectedIgnoreDirs);
  }, [handleSelectedDirs, handleSelectedIgnoreDirs]);


  // Event handlers
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleRemoveDir = () => {
    removeDir(selectedPaths)
  }

  const handleRemoveIgnoreDir = () => {
    removeIgnoreDir(selectedPaths)
  }

  const handleSwapIndex2Ignore = () => {
    console.log('swap index to ignore')
    handleRemoveDir()
    addIgnoreDirs(selectedPaths);
  }

  const handleSwapIgnore2Index = () => {
    console.log('swap ignore to index')
    handleRemoveIgnoreDir()
    addDirs(selectedPaths);
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

  const [selectedMode, setSelectedMode] = React.useState<string>("");
  const [DBPath, setDBPath] = React.useState<string>("");
  const [selectedTextModel, setSelectedTextModel] = React.useState<string>("");
  const [selectedImageModel, setSelectedImageModel] = React.useState<string>("");
  const [selectedVideoModel, setSelectedVideoModel] = React.useState<string>("");
  const [selectedSearchApproach, setSelectedSearchApproach] = React.useState<string>("");

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Indexed" {...a11yProps(0)} />
            <Tab label="Ignored" {...a11yProps(1)} />
            <Tab label="Settings" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <IndexButtons handleSwap={handleSwapIndex2Ignore} handleAdd={handleAddDirs} handleCopy={handleCopy} handleRemove={handleRemoveDir} />
          <PathsGrid users={paths ? paths.dirsToCrawl : []} setSelectedPaths={setSelectedPaths} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <IndexButtons handleSwap={handleSwapIgnore2Index} handleAdd={handleAddIgnoreDirs} handleCopy={handleCopy} handleRemove={handleRemoveIgnoreDir} />
          <PathsGrid users={paths ? paths.dirsToIgnore : []} setSelectedPaths={setSelectedPaths} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Settings
            mode={selectedMode}
            setMode={setSelectedMode}
            storageDBPath={DBPath}
            setStorageDBPath={setDBPath}
            textModel={selectedTextModel}
            setTextModel={setSelectedTextModel}
            imageModel={selectedImageModel}
            setImageModel={setSelectedImageModel}
            videoModel={selectedVideoModel}
            setVideoModel={setSelectedVideoModel}
            defaultSearchApproach={selectedSearchApproach}
            setDefaultSearchApproach={setSelectedSearchApproach}
          />
        </CustomTabPanel>
      </Box>
      <Button variant="contained"
        onClick={() =>
          ipcRenderer.send('save', { selectedMode, DBPath, selectedTextModel, selectedImageModel, selectedVideoModel, selectedSearchApproach })}>
        save
      </Button>
    </>
  );
}
