import { useQuery } from "@tanstack/react-query";
import { testFile as testFileService } from "../../../infrastructure/services/testFiles.ts";
import { useState } from "react";

export default function useTestFiles() {
  const [file, setFile] = useState<{
    path: string;
    type: string;
  }>({
    path: "",
    type: ""
  });
  const {
    data: result,
    isError,
    isLoading,
    isSuccess,
    error,
    status
  } = useQuery({
    queryKey: ["testFiles", file],
    queryFn: () => {
      console.log("Testing file", file);
      return testFileService({ path: file.path, type: file.type });
    },
    enabled: file.path !== "" && file.type !== "",
    staleTime: Infinity
  });
  const testFile = (path: string, type: string) => {
    console.log("Testing file == ", path, type);
    setFile({ path, type });
  };
  return {
    testFile,
    result,
    type: file.type,
    isError,
    isLoading,
    isSuccess,
    error,
    status
  };
}
