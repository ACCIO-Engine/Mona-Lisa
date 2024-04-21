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
      <Typography gutterBottom variant="h5" component="div">
        {file.name}
      </Typography>
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
  const filePreview =
    file.type === FileType.Image ? (
      <ImageFilePreview file={file} />
    ) : file.type === FileType.PDF ? (
      <PDFFilePreview file={file} />
    ) : file.type === FileType.Word ? (
      <WordFilePreview file={file} />
    ) : (
      <DefaultFilePreview file={file} />
    );

  return (
    <Card
      sx={{
        maxWidth: 345,
        maxHeight: 300,
        p: 2
      }}
    >
      <CardContent
        sx={{
          p: 0,
          height: 200
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
        <IconButton color="primary">
          <FileOpenIcon />
        </IconButton>
        <IconButton color="primary">
          <FolderOpenIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default FilePreview;
