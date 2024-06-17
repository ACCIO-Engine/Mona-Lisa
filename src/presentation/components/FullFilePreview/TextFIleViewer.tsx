import { File } from "../../../application";
import { useEffect, useState } from "react";
import { IPC_EVENTS } from "../../Constants.ts";
import { Box, Typography } from "@mui/material";

const TextFileViewer = ({ file }: { file: File }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const readFileContent = async () => {
      try {
        const data = await (window as any).ipcRenderer.invoke(IPC_EVENTS.READ_FILE, file.path);
        setContent(data);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    };

    if (file.path) {
      readFileContent();
    }
  }, [file]);

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          whiteSpace: "pre-wrap", wordBreak: "break-word",
          fontSize: "1.1rem", lineHeight: "1.5rem"
        }}
      >{content}</Typography>
    </Box>
  );
};

export default TextFileViewer;