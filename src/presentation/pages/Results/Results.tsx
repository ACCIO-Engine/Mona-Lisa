import React from "react";
import ResultsGrid from "../../layouts/ResultsGrid/ResultsGrid";
import { useSearch } from "../../../application";
import {
  ErrorAlert,
  InfoAlert,
  LoadingAlert
} from "../../components/Alert/Alert";
import { Container, MessageAlerts } from "./Results.styled";
import { SnackbarProvider } from "../../contexts/SnackbarContext";


const Results: React.FC = () => {
  const {
    files,
    isError,
    isLoading,
    isSuccess,
    error,
    status,
    totalResults,
    totalPages
  } = useSearch();
  console.log(files, isError, isLoading, isSuccess, error, status);
  //   const tempFiles: File[] = [
  //   {
  //     path: "/mnt/D/Material/4th/graduation-project/Octopus/TestFiles/video1.mp4",
  //     score: 0.011982929094215963,
  //     type: "video",
  //     pages: [0]
  //   }
  // ];
  // console.log("tempFiles = ", tempFiles);
  return (
    <SnackbarProvider>

      <Container>
        {!(isSuccess && files && files.length > 0) && (
          <MessageAlerts>
            {isLoading && <LoadingAlert message="Searching for files..." />}
            {isError && error && <ErrorAlert message={error.message} />}
            {files && files.length === 0 && (
              <InfoAlert message="No files found." />
            )}
            {!files && !isError && !isLoading && !isSuccess && (
              <InfoAlert message="Search for files using the search bar above." />
            )}
          </MessageAlerts>
        )}
        {isSuccess && files && files.length > 0 &&
          <ResultsGrid files={files} totalPages={totalPages} totalResults={totalResults} />}
      </Container>
    </SnackbarProvider>
  );
};
// {/* <ResultsGrid /> */}

export default Results;
