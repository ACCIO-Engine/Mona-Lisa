import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { File, FileType } from "../../../application";
import Logo from "../../assets/imageOnly.svg";
import FullFilePreview from "../FullFilePreview/FullFilePreview";
import { useState } from "react";
import PDFIcon from "../../assets/pdf.svg?react";
import DOCIcon from "../../assets/doc.svg?react";
import PPTIcon from "../../assets/ppt.svg?react";
import TextIcon from "../../assets/txt.svg?react";
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
  return (
    <>
      <DOCIcon />
    </>
  );
};
const PowerPointFilePreview = ({ file }: { file: File }) => {
  return (
    <>
      <PPTIcon />
    </>
  );
};
const TextFilePreview = ({ file }: { file: File }) => {
  return (
    <>
      <TextIcon />
    </>
  );
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

const FilePreview = ({ file }: { file: File }) => {
  const [openFullPreview, setOpenFullPreview] = useState(false);

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
    ) : (
      <DefaultFilePreview file={file} />
    );

  return (
    <>
      <FullFilePreview
        file={file}
        open={openFullPreview}
        setOpen={setOpenFullPreview}
      />
      <Card
        sx={{
          height: 250,
          width: 250,
          p: 2
        }}
      >
        <CardContent
          sx={{
            p: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            height: 150,
            width: 150
          }}
        >
          {filePreview}
        </CardContent>
        <CardContent
          sx={{
            p: 0
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {file.name}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            p: 0,
            width: "100%"
          }}
        >
          <IconButton color="primary">
            <ContentCopyIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => setOpenFullPreview(true)}>
            <FileOpenIcon />
          </IconButton>
          <IconButton color="primary">
            <FolderOpenIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default FilePreview;
