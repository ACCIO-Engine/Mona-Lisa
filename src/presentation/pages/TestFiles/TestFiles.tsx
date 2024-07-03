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
import FormatAlignLeftRoundedIcon from "@mui/icons-material/FormatAlignLeftRounded";
import React from "react";
import useTestFiles from "../../../application/usecases/testFiles/useTestFiles.usecase.ts";

export const TestFiles: React.FC = () => {
  const { testFile, isError, isLoading, isSuccess } = useTestFiles();
  const handleUpload = (path: string, type: string) => {
    testFile(path,type);
  };
  return (
    <Box>
      <Title>Check How Accio Understands Your Files</Title>
      <Container>
        <UploadButton
          component="label"
          role={undefined}
          tabIndex={-1}
        >
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
        <UploadButton
          component="label"
          role={undefined}
          tabIndex={-1}
        >
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
        <UploadButton
          component="label"
          role={undefined}
          tabIndex={-1}
        >
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
        {
          !isLoading && !isError && !isSuccess && (
            <TextMessage>
              Upload a file to see how Accio understands it
            </TextMessage>
          )
        }
        {isLoading && <TextMessage>Processing...</TextMessage>}
        {isError && <TextMessage>Error</TextMessage>}
        {isSuccess && (
          <Container>
            <Typography>{testFile}</Typography>
          </Container>
        )}
      </ResultContainer>
    </Box>
  );
};