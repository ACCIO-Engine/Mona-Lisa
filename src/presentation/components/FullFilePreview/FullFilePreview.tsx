import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  Toolbar
} from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { File, FileType } from "../../../application";
import Logo from "../../assets/imageOnly.svg";
import { GridCloseIcon } from "@mui/x-data-grid";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { FileContainer } from "./FullFilePreview.styled";
import TextFileViewer from "./TextFIleViewer.tsx";

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


const DefaultFilePreview = ({ file }: { file: File }) => {
  return (
    <>
      <CardMedia component="img" alt={file.name} image={Logo} />
    </>
  );
};
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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
      <PDFFilePreview file={file} />
    ) : file.type === FileType.Word ? (
      <WordFilePreview file={file} />
    ) : file.type === FileType.Video ? (
      <VideoFilePreview file={file} />
    ) : file.type === FileType.Text ? (
      <TextFileViewer file={file} />
    ) : (
      <DefaultFilePreview file={file} />
    );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
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
          <IconButton color="primary">
            <ContentCopyIcon />
          </IconButton>
          <IconButton color="primary">
            <FolderOpenIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <FileContainer>{filePreview}</FileContainer>
    </Dialog>
  );
};

export default FullFilePreview;
