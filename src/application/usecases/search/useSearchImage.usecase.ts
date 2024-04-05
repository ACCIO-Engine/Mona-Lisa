import { useQuery } from "@tanstack/react-query";
import { searchImage } from "../../../infrastructure";
import getFileNameFromPath from "../../utils/getFileNameFromPath";

export default function useSearchImage(query: string) {
  const {
    data: files,
    isError,
    isLoading,
    isSuccess,
    error,
    status,
  } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchImage(query),
  });

  return {
    files: files?.map(
      (file: { path: string; score: number; pages: number[] }) => ({
        path: file.path,
        score: file.score,
        pages: file.pages,
        name: getFileNameFromPath(file.path),
      })
    ),
    isError,
    isLoading,
    isSuccess,
    error,
    status,
  };
}
