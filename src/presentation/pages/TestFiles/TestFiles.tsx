import { Box, Typography } from "@mui/material";
import {
  Title,
  Container,
  UploadButton,
  ResultContainer,
  TextMessage
} from "./TestFiles.styled.ts";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";
import HeadsetRoundedIcon from "@mui/icons-material/HeadsetRounded";
import React from "react";
import useTestFiles from "../../../application/usecases/testFiles/useTestFiles.usecase.ts";

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
        padding: "1rem",
        height: "100%"
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
        padding: "1rem",
        height: "100%"
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
        padding: "1rem",
        height: "100%"
      }}
    >
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: "bold",
          display: "block"
        }}
      >
        Transcript: {transcript}
      </Typography>
      {keyframes.map((keyframe, index) => (
        <Box
          key={index}
          sx={{}}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              display: "block"
            }}
          >
            Caption: {keyframe.caption}
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
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

export const TestFiles: React.FC = () => {
  const { testFile, isError, isLoading, isSuccess, result, type } =
    useTestFiles();
  const handleUpload = (path: string, type: string) => {
    testFile(path, type);
  };
  console.log(result);
  return (
    <Box sx={{ height: "100%" }}>
      <Title>Check How Accio Understands Your Files</Title>
      <Container>
        <UploadButton component="label" role={undefined} tabIndex={-1}>
          <ImageRoundedIcon sx={{ fontSize: "3rem" }} />
          <input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            accept="image/*"
            type="file"
            onChange={(e) => {
              handleUpload(e.target.files![0].path, "image");
              console.log(
                e.target.files,
                e.target.files![0],
                e.target.files![0].path
              );
            }}
          />
        </UploadButton>
        <UploadButton component="label" role={undefined} tabIndex={-1}>
          <MovieRoundedIcon sx={{ fontSize: "3rem" }} />
          <input
            style={{ display: "none" }}
            id="upload-video"
            name="upload-video"
            accept="video/*"
            type="file"
            onChange={(e) => {
              handleUpload(e.target.files![0].path, "video");
              console.log(
                e.target.files,
                e.target.files![0],
                e.target.files![0].path
              );
            }}
          />
        </UploadButton>
        <UploadButton component="label" role={undefined} tabIndex={-1}>
          <HeadsetRoundedIcon sx={{ fontSize: "3rem" }} />
          <input
            style={{ display: "none" }}
            id="upload-audio"
            name="upload-audio"
            accept="audio/*"
            type="file"
            onChange={(e) => {
              handleUpload(e.target.files![0].path, "audio");
              console.log(
                e.target.files,
                e.target.files![0],
                e.target.files![0].path
              );
            }}
          />
        </UploadButton>
        {/*<UploadButton*/}
        {/*  component="label"*/}
        {/*  role={undefined}*/}
        {/*  tabIndex={-1}*/}
        {/*>*/}
        {/*  <FormatAlignLeftRoundedIcon sx={{ fontSize: "3rem" }} />*/}
        {/*  /!* any text documents like docx, pptx, txt, pdf, etc. *!/*/}
        {/*  <input*/}
        {/*    style={{ display: "none" }}*/}
        {/*    id="upload-text-documents"*/}
        {/*    name="upload-text-documents"*/}
        {/*    accept="application/msword, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation, text/plain, application/pdf"*/}
        {/*    type="file"*/}
        {/*    onChange={(e) => {*/}
        {/*      handleUpload(e.target.files![0].path, "text");*/}
        {/*      console.log(*/}
        {/*        e.target.files,*/}
        {/*        e.target.files![0],*/}
        {/*        e.target.files![0].path*/}
        {/*      );*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</UploadButton>*/}
      </Container>
      <ResultContainer>
        {!isLoading && !isError && !isSuccess && (
          <TextMessage>
            Upload a file to see how Accio understands it
          </TextMessage>
        )}
        {isLoading && <TextMessage>Processing...</TextMessage>}
        {isError && <TextMessage>Error</TextMessage>}
        {isSuccess && (
          <Container>
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
          </Container>
        )}
      </ResultContainer>
    </Box>
  );
};
