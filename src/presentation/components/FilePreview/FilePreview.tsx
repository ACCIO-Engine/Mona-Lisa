import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { File, FileType } from "../../../application";
import Logo from "../../assets/imageOnly.svg";
import FullFilePreview from "../FullFilePreview/FullFilePreview";
import PDFIcon from "../../assets/pdf.svg?react";
import DOCIcon from "../../assets/doc.svg?react";
import PPTIcon from "../../assets/ppt.svg?react";
import TextIcon from "../../assets/txt.svg?react";
import VideoIcon from "../../assets/video.svg?react";
import AudioIcon from "../../assets/audio.svg?react";
import copyTextToClipboard from "../../utils/copy";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { alpha } from "@mui/system";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InfoRoundedIcon from "@mui/icons-material/Info";
import FileTesting from "../FileTesting/FileTesting.tsx";
import useTestFiles from "../../../application/usecases/testFiles/useTestFiles.usecase.ts";
import useIndexType from "../../../application/usecases/indexTypes/useIndexTypes.usecase.ts";
import IndexTypes from "../IndexTypes/IndexTypes.tsx";

const ImageFilePreview = ({ file }: { file: File }) => {
  return (
    <CardMedia
      component="img"
      alt={file.name}
      image={`file://${file.path}`}
      width="100%"
      height="100%"
    />
  );
};

const PDFFilePreview = ({ file }: { file: File }) => {
  return <PDFIcon />;
};

const WordFilePreview = ({ file }: { file: File }) => {
  return <DOCIcon />;
};

const PowerPointFilePreview = ({ file }: { file: File }) => {
  return <PPTIcon />;
};

const TextFilePreview = ({ file }: { file: File }) => {
  return <TextIcon />;
};

const VideoFilePreview = ({ file }: { file: File }) => {
  return <VideoIcon />;
};
const AudioFilePreview = ({ file }: { file: File }) => {
  return <AudioIcon />;
};

const DefaultFilePreview = ({ file }: { file: File }) => {
  return (
    <>
      <CardMedia component="img" alt={file.name} image={Logo} />
      <Typography gutterBottom variant="h5" component="div">
        {file.name}
      </Typography>
    </>
  );
};

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({theme}) => {
  return {
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    boxShadow: theme?.shadows[1],
    width: 'fit-content',
  },
}});
const FilePreview = ({ file }: { file: File }) => {
  const ipcRenderer = (window as any).ipcRenderer;
  const [openFullPreview, setOpenFullPreview] = useState(false);
  const [openTestingFile, setOpenTestingFile] = useState(false);
  const theme = useTheme();
  const { testFile, isError, isLoading, isSuccess, result, type } =
    useTestFiles();
  const {
    indexTypes,
    result: indexTypesResult,
    isError: indexTypesIsError,
    isLoading: indexTypesIsLoading
  } = useIndexType();
  const filePreview =
    file.type === FileType.Image ? (
      <ImageFilePreview file={file} />
    ) : file.type === FileType.PDF ? (
      <PDFFilePreview file={file} />
    ) : file.type === FileType.Word ? (
      <WordFilePreview file={file} />
    ) : file.type === FileType.PowerPoint ? (
      <PowerPointFilePreview file={file} />
    ) : file.type === FileType.Text ? (
      <TextFilePreview file={file} />
    ) : file.type === FileType.Video ? (
      <VideoFilePreview file={file} />
    ) : file.type === FileType.Audio ? (
      <AudioFilePreview file={file} />
    ) : (
      <DefaultFilePreview file={file} />
    );

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

  const handleFilePreview = (type: FileType) => {
    // if (type === FileType.Word || type === FileType.PowerPoint)
    //   ipcRenderer.send('open-office', file.path)
    // else
    // {
    //   setOpenFullPreview(true);
    // }
    setOpenFullPreview(true);
  };

  const handleFileTesting = (file: File) => {
    testFile(
      file.path,
      file.type === FileType.Image
        ? "image"
        : file.type === FileType.Audio
          ? "audio"
          : "video"
    );

    setOpenTestingFile(true);
  };

  const handleIndexTypes = (file: File) => {
    indexTypes(file.path);
  };

  console.log("indexTypesResult", indexTypesResult);
  
  return (
    <>
      <FullFilePreview
        file={file}
        open={openFullPreview}
        setOpen={setOpenFullPreview}
      />
      {openTestingFile && (
        <FileTesting
          file={file}
          open={openTestingFile}
          setOpen={setOpenTestingFile}
          isError={isError}
          isLoading={isLoading}
          isSuccess={isSuccess}
          result={result}
          type={type}
        />
      )}
      <Card
        sx={{
          p: 2,
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: `0 4px 30px ${alpha(theme.palette.primary.dark, 0.2)}`,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
          backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.common.white, 0.3)} 0%, ${alpha(theme.palette.common.white, 0.1)} 100%`
        }}
      >
        <CardContent
          sx={{
            p: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            height: 100,
            width: 100
          }}
        >
          {filePreview}
        </CardContent>
        <CardContent
          sx={{
            p: 0
          }}
        >
          <Typography
            gutterBottom
            sx={{
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {file.name}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            p: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <IconButton color="primary" onClick={() => handleCopyPath(file.path)}>
            <ContentCopyIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleFilePreview(file.type)}
          >
            <FileOpenIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => ipcRenderer.send("open-folder", file.path)}
          >
            <FolderOpenIcon />
          </IconButton>
          {(file.type === FileType.Video ||
            file.type === FileType.Audio ||
            file.type === FileType.Image) && (
            <IconButton color="primary" onClick={() => handleFileTesting(file)}>
              <HelpOutlineIcon />
            </IconButton>
          )}
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
              <InfoRoundedIcon  />
            </IconButton>
          </CustomTooltip>
        </CardActions>
      </Card>
    </>
  );
};

export default FilePreview;
