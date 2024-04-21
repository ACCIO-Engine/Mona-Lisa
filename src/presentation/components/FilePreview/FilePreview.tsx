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


const ImageFilePreview = ({ file }: { file: File }) => {
  return <img alt={file.name} height="200" src={`file://${file.path}`} />;
};

const DefaultFilePreview = ({ file }: { file: File }) => {
  return (
    <CardContent
      sx={{
        p: 0
      }}
    >
      <Typography gutterBottom variant="h5" component="div">
        {file.name}
      </Typography>
    </CardContent>
  );
};

const FilePreview = ({ file }: { file: File }) => {
  const filePreview =
    file.type === FileType.Image ? (
      <ImageFilePreview file={file} />
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
      {filePreview}
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
