import { useQuery } from "@tanstack/react-query";
import { testFile as testFileService } from "../../../infrastructure/services/testFiles.ts";

export default function useTestFiles() {
  const {
    data: result,
    isError,
    isLoading,
    isSuccess,
    error,
    status
  } = useQuery({
    queryKey: ["testFiles"],
    queryFn: () => {
    },
    enabled: true,
    staleTime: Infinity
  });
  const testFile = (path: string) => {
    testFileService({ path });
  };
  return {
    testFile,
    result,
    isError,
    isLoading,
    isSuccess,
    error,
    status
  };
}