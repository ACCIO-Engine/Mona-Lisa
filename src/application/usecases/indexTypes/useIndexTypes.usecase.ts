import { useQuery } from "@tanstack/react-query";
import { getIndexType as indexTypeService } from "../../../infrastructure/services/indexType.ts";
import { useState } from "react";

export default function useIndexType() {
  const [file, setFile] = useState<{
    path: string;
  }>({
    path: ""
  });
  const {
    data: result,
    isError,
    isLoading,
    isSuccess,
    error,
    status
  } = useQuery({
    queryKey: ["index", file],
    queryFn: () => {
      console.log("index types file", file);
      return indexTypeService({ path: file.path });
    },
    enabled: file.path !== "",
    staleTime: Infinity
  });
  const indexTypes = (path: string) => {
    console.log("index types file == ", path);
    setFile({ path });
  };
  return {
    indexTypes,
    result,
    isError,
    isLoading,
    isSuccess,
    error,
    status
  };
}
