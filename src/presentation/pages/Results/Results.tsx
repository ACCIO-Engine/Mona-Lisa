import React from "react";
import ResultsGrid from "../../layouts/ResultsGrid/ResultsGrid";
import { useSearch } from "../../../application";
import { Box } from "@mui/material";
import {
  ErrorAlert,
  InfoAlert,
  LoadingAlert
} from "../../components/Alert/Alert";
import { Container, MessageAlerts } from "./Results.styled";

const Results: React.FC = () => {
  const { files, isError, isLoading, isSuccess, error, status } = useSearch();
  console.log(files, isError, isLoading, isSuccess, error, status);
  return (
    <Container>
      {!(isSuccess && files && files.length > 0) && (
        <MessageAlerts>
          {isLoading && <LoadingAlert message="Searching for files..." />}
          {isError && error && <ErrorAlert message={error.message} />}
          {files && files.length === 0 && (
            <InfoAlert message="No files found." />
          )}
        </MessageAlerts>
      )}
      {isSuccess && files && files.length > 0 && <ResultsGrid files={files} />}
    </Container>
  );
};
// {/* <ResultsGrid /> */}

export default Results;
