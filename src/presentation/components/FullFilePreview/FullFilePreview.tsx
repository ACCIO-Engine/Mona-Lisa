import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { AppBar, Box, Dialog, IconButton, Slide, Toolbar, Tooltip } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { File, FileType } from "../../../application";
import Logo from "../../assets/imageOnly.svg";
import { GridCloseIcon } from "@mui/x-data-grid";
import { FileContainer } from "./FullFilePreview.styled";
import TextFileViewer from "./TextFIleViewer.tsx";
import useIndexType from "../../../application/usecases/indexTypes/useIndexTypes.usecase.ts";
import copyTextToClipboard from "../../utils/copy.ts";
import { useSnackbar } from "../../contexts/SnackbarContext.tsx";
import IndexTypes from "../IndexTypes/IndexTypes.tsx";
import { styled } from "@mui/material/styles";
import { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import InfoRoundedIcon from "@mui/icons-material/Info";
import { CustomTooltip } from "../FilePreview/FilePreview.tsx";

const ImageFilePreview = ({ file }: { file: File }) => {
  return (
    <CardMedia
      component="img"
      alt={file.name}
      image={`file://${file.path}`}
      width="100%"
      height="100%"
      sx={{
        objectFit: "contain"
      }}
    />
  );
};

const PDFFilePreview = ({ file }: { file: File }) => {
  return (
    <iframe
      title={file.name}
      src={`file://${file.path}#page=1`}
      width="100%"
      height="100%"
    />
  );
};

const WordFilePreview = ({ file }: { file: File }) => {
  return (
    <>
      <CardMedia
        component="img"
        alt={file.name}
        image={Logo}
        width="100%"
        height="100%"
      />
    </>
  );
};

const VideoFilePreview = ({ file }: { file: File }) => {
  return (
    <video width="100%" height="100%" controls>
      <source src={`file://${file.path}`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

const AudioFilePreview = ({ file }: { file: File }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <audio controls>
        <source src={`file://${file.path}`} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>
    </Box>
  );
};

const DefaultFilePreview = ({ file }: { file: File }) => {
  return (
    <>
      <CardMedia component="img" alt={file.name} image={Logo} />
    </>
  );
};

const FullFilePreview = ({
  open,
  setOpen,
  file
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  file: File;
}) => {
  const filePreview =
    file.type === FileType.Image ? (
      <ImageFilePreview file={file} />
    ) : file.type === FileType.PDF ? (
      <TextFileViewer file={file} />
    ) : file.type === FileType.Word ? (
      <TextFileViewer file={file} />
    ) : file.type === FileType.Video ? (
      <VideoFilePreview file={file} />
    ) : file.type === FileType.Text ? (
      <TextFileViewer file={file} />
    ) : file.type === FileType.PowerPoint ? (
      <TextFileViewer file={file} />
    ) : file.type === FileType.Audio ? (
      <AudioFilePreview file={file} />
    ) : (
      <DefaultFilePreview file={file} />
    );

  const handleClose = () => {
    setOpen(false);
  };

  const {
    indexTypes,
    result: indexTypesResult,
    isError: indexTypesIsError,
    isLoading: indexTypesIsLoading
  } = useIndexType();
  const ipcRenderer = (window as any).ipcRenderer;
  const { openSnackbar } = useSnackbar();

  const handleCopyPath = (path: string) => {
    const pathParts = path.split(/[\\/]/);
    pathParts.pop(); // Remove the file name
    const dir = pathParts.join("\\");
    copyTextToClipboard([dir]).then((success) => {
      if (success) {
        openSnackbar("Path copied to clipboard successfully", "success");
      } else {
        openSnackbar("Failed to copy path to clipboard", "error");
      }
    });
  };

  const handleIndexTypes = (file: File) => {
    indexTypes(file.path);
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Slide}
      sx={{
        height: "100vh"
      }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <GridCloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {file.name}
          </Typography>
          {/* <IconButton color="primary">
            <ContentCopyIcon />
          </IconButton>
          <IconButton color="primary">
            <FolderOpenIcon />
          </IconButton> */}
          <IconButton color="primary" onClick={() => handleCopyPath(file.path)}>
            <ContentCopyIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => ipcRenderer.send("open-folder", file.path)}
          >
            <FolderOpenIcon />
          </IconButton>
          <CustomTooltip
            followCursor
            title={
              <IndexTypes
                isLoading={indexTypesIsLoading}
                isError={indexTypesIsError}
                result={indexTypesResult}
              />
            }
            onMouseEnter={() => handleIndexTypes(file)}
          >
            <IconButton sx={{ p: 0 }} color="primary">
              <InfoRoundedIcon />
            </IconButton>
          </CustomTooltip>
        </Toolbar>
      </AppBar>
      <FileContainer>{filePreview}</FileContainer>
    </Dialog>
  );
};

export default FullFilePreview;
