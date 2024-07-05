import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { TextMessage } from "../../pages/TestFiles/TestFiles.styled.ts";
import useTestFiles from "../../../application/usecases/testFiles/useTestFiles.usecase.ts";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { File, FileType } from "../../../application";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const ShowImageResult = ({
                           caption,
                           ocr
                         }: {
  caption: string;
  ocr: string;
}) => {
  return (
    <Box
      sx={{
        padding: "1rem"
      }}
    >
      <Typography
        sx={{
          whiteSpace: "pre-wrap",
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          display: "block"
        }}
      >
        Caption: {caption}
      </Typography>
      <Typography
        sx={{
          whiteSpace: "pre-wrap",
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          display: "block"
        }}
      >
        OCR: {ocr}
      </Typography>
    </Box>
  );
};

const ShowAudioResult = ({ transcript }: { transcript: string }) => {
  return (
    <Box
      sx={{
        padding: "1rem"
      }}
    >
      <Typography
        sx={{
          whiteSpace: "pre-wrap",
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          display: "block"
        }}
      >
        Transcript: {transcript}
      </Typography>
    </Box>
  );
};

const ShowVideoResult = ({
                           keyframes,
                           transcript
                         }: {
  keyframes: { caption: string; ocr: string }[];
  transcript: string;
}) => {
  return (
    <Box
      sx={{
        padding: "1rem"
      }}
    >
      <Typography
        sx={{
          whiteSpace: "pre-wrap",
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          display: "block"
        }}
      >
        Transcript: {transcript}
      </Typography>
      {keyframes.map((keyframe, index) => (
        <Box
          key={index}
          sx={{
            padding: "1rem"
          }}
        >
          <Typography
            sx={{
              whiteSpace: "pre-wrap",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              display: "block"
            }}
          >
            Caption: {keyframe.caption}
          </Typography>
          <Typography
            sx={{
              whiteSpace: "pre-wrap",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              display: "block"
            }}
          >
            OCR: {keyframe.ocr}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default function FileTesting({
                                      file, open, setOpen,
                                      isError, isLoading, isSuccess, result, type
                                    }: {
  file: File;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  result: any;
  type: string;
}) {
  const handleClose = () => {
    setOpen(false);
  };
  console.log(file, isError, isLoading, isSuccess, result, type);
  return (
    <Dialog
      open={open}
      // TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle> {file.name} </DialogTitle>
      <DialogContent>
        {isLoading && <TextMessage>Processing...</TextMessage>}
        {isError && <TextMessage>Error</TextMessage>}
        {isSuccess && (
          <>
            {type === "image" && (
              <ShowImageResult caption={result.caption} ocr={result.ocr} />
            )}
            {type === "audio" && (
              <ShowAudioResult transcript={result.transcript} />
            )}
            {type === "video" && (
              <ShowVideoResult
                keyframes={result.keyframes}
                transcript={result.transcript}
              />
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
