import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PathsGrid from "../../components/DataGrid/PathsGrid";
import IndexButtons from "../../components/IndexButtons/IndexButtons";
import { useSnackbar } from "../../contexts/SnackbarContext";
import copyTextToClipboard from "../../utils/copy";
import Settings from "../../layouts/Settings/Settings";
import { Button } from "@mui/material";
import SearchMode from "../../../application/types/ModeSearchType.enum";
// import TextModels from "../../../application/types/TextModels.enum";
import ImageModels from "../../../application/types/ImageModels.enum";
import CBIR_MODES from "../../../application/types/CBIRMode.enum";
// import VideoModels from "../../../application/types/VideoModels.enum";
// import SearchApproaches from "../../../application/types/SearchApproaches.enum";

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
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function BasicTabs() {
  const [selectedMode, setSelectedMode] = React.useState<string>("");
  const [DBPath, setDBPath] = React.useState<string>("");
  // const [selectedTextModel, setSelectedTextModel] = React.useState<string>("");
  const [selectedImageModel, setSelectedImageModel] = React.useState<string>("");
  // const [selectedVideoModel, setSelectedVideoModel] = React.useState<string>("");
  // const [selectedSearchApproach, setSelectedSearchApproach] = React.useState<string>("");
  const [selectedCbirMode, setCbirMode] = React.useState<string>("");

  const [selectedPaths, setSelectedPaths] = React.useState<Set<string>>(new Set<string>());
  const [ignoredPaths, setIgnoredPaths] = React.useState<Set<string>>(new Set<string>());
  const [crawledPaths, setCrawledPaths] = React.useState<Set<string>>(new Set<string>());
  const [value, setValue] = React.useState(0);

  const { openSnackbar } = useSnackbar();

  const ipcRenderer = (window as any).ipcRenderer;

  const handleSelectedDirs = React.useCallback((event: any, dirs: string[]) => {
    const uniqueDirs = new Set(dirs);
    setCrawledPaths((prevCrawledPaths) => new Set([...prevCrawledPaths, ...uniqueDirs]));
  }, [setCrawledPaths]);

  const handleSelectedIgnoreDirs = React.useCallback((event: any, dirs: string[]) => {
    const uniqueDirs = new Set(dirs);
    setIgnoredPaths((prevIgnoredPaths) => new Set([...prevIgnoredPaths, ...uniqueDirs]));
  }, [setIgnoredPaths]);

  // receive config data from main process
  const handleLoadConfig = React.useCallback((event: any, config: any) => {
    setSelectedMode(config.mode || SearchMode.CLASSICAL);
    setCbirMode(config.cbir || CBIR_MODES.NONE)
    setDBPath(config.vectorDBPath || "./data");
    setSelectedImageModel(config.imageCaptioners || ImageModels.VIT_GPT2);
    // setSelectedTextModel(config.embedders || TextModels.NANOBERT);
    // setSelectedVideoModel(config.videoCaptioners || VideoModels.MODEL1);
    // setSelectedSearchApproach(config.searchAppraoch || SearchApproaches.BOTH);
    setCrawledPaths(new Set(config.paths));
    setIgnoredPaths(new Set(config.ignoredPaths));
  }, [setSelectedMode, setCbirMode, setDBPath, setSelectedImageModel, setCrawledPaths, setIgnoredPaths]);

  React.useEffect(() => {
    ipcRenderer.send("get-config");
    ipcRenderer.on("config", handleLoadConfig);
    return () => {
      // remove all event listeners when component unmounts
      ipcRenderer.removeAllListeners("config");
    };
  }, [handleLoadConfig, ipcRenderer]);

  React.useEffect(() => {
    ipcRenderer.on("selected-dirs", handleSelectedDirs);
    ipcRenderer.on("selected-ignore-dirs", handleSelectedIgnoreDirs);
  }, [handleSelectedDirs, handleSelectedIgnoreDirs, ipcRenderer]);


  // Event handlers
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleRemoveDir = () => {
    const newCrawledPaths = new Set(crawledPaths);
    selectedPaths.forEach(path => {
      newCrawledPaths.delete(path);
    });
    setCrawledPaths(newCrawledPaths);

  };

  const handleRemoveIgnoreDir = () => {
    const newIgnoredPaths = new Set(ignoredPaths);
    selectedPaths.forEach(path => {
      newIgnoredPaths.delete(path);
    });
    setIgnoredPaths(newIgnoredPaths);

  };

  const handleSwapIndex2Ignore = () => {
    console.log("swap index to ignore");
    // Create a new set of crawled paths without the selected paths
    const newCrawledPaths = new Set([...crawledPaths].filter((path) => !selectedPaths.has(path)));
    // Add selected paths to ignored paths set
    const newIgnoredPaths = new Set([...ignoredPaths, ...selectedPaths]);
    console.log(newCrawledPaths, newIgnoredPaths);
    // Update the state with the new sets
    setCrawledPaths(newCrawledPaths);
    setIgnoredPaths(newIgnoredPaths);
  };

  const handleSwapIgnore2Index = () => {
    console.log("swap ignore to index");
    // Create a new set of ignored paths without the selected paths
    const newIgnoredPaths = new Set([...ignoredPaths].filter((path) => !selectedPaths.has(path)));
    // Add selected paths to crawled paths set
    const newCrawledPaths = new Set([...crawledPaths, ...selectedPaths]);

    // Update the state with the new sets
    setCrawledPaths(newCrawledPaths);
    setIgnoredPaths(newIgnoredPaths);
  };


  const handleAddDirs = () => {
    ipcRenderer.send("open-select-dirs-dialog");
  };

  const handleAddIgnoreDirs = () => {
    ipcRenderer.send("open-select-ignore-dirs-dialog");
  };

  const handleCopy = () => {
    const selectedPathsArray = Array.from(selectedPaths);
    copyTextToClipboard(selectedPathsArray).then((success) => {
      if (success) {
        openSnackbar("Path copied to clipboard successfully", "success");
      } else {
        openSnackbar("Failed to copy path to clipboard", "error");
      }
    });
  };


  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between"
        }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Indexed" sx={{
              fontWeight: "bold",
              fontSize: "1rem"
            }} {...a11yProps(0)} />
            <Tab label="Ignored" sx={{
              fontWeight: "bold",
              fontSize: "1rem"
            }} {...a11yProps(1)} />
            <Tab label="Settings" sx={{
              fontWeight: "bold",
              fontSize: "1rem"
            }} {...a11yProps(2)} />
          </Tabs>
          <Button variant="contained"
            sx={{ margin: "0 1rem 1rem 0" }}
            onClick={() =>
              ipcRenderer.send("save",
                {
                  "mode": selectedMode,
                  "cbir": selectedCbirMode,
                  "vectorDBPath": DBPath,
                  // "embedders": selectedTextModel,
                  "imageCaptioners": selectedImageModel,
                  // "videoCaptioners": selectedVideoModel,
                  // "searchAppraoch": selectedSearchApproach,
                  "paths": crawledPaths,
                  "ignoredPaths": ignoredPaths
                })}>
            save
          </Button>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <IndexButtons handleSwap={handleSwapIndex2Ignore} handleAdd={handleAddDirs}
            handleCopy={handleCopy} handleRemove={handleRemoveDir} />
          <PathsGrid paths={crawledPaths} setSelectedPaths={setSelectedPaths} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <IndexButtons handleSwap={handleSwapIgnore2Index} handleAdd={handleAddIgnoreDirs}
            handleCopy={handleCopy} handleRemove={handleRemoveIgnoreDir} />
          <PathsGrid paths={ignoredPaths} setSelectedPaths={setSelectedPaths} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Settings
            mode={selectedMode}
            setMode={setSelectedMode}
            cbirMode={selectedCbirMode}
            setCbirMode={setCbirMode}
            storageDBPath={DBPath}
            setStorageDBPath={setDBPath}
            // textModel={selectedTextModel}
            // setTextModel={setSelectedTextModel}
            imageModel={selectedImageModel}
            setImageModel={setSelectedImageModel}
          // videoModel={selectedVideoModel}
          // setVideoModel={setSelectedVideoModel}
          // defaultSearchApproach={selectedSearchApproach}
          // setDefaultSearchApproach={setSelectedSearchApproach}
          />
        </CustomTabPanel>
      </Box>
    </>
  );
}