import { useQuery } from "@tanstack/react-query";
import { search as searchService } from "../../../infrastructure";
import getFileNameFromPath from "../../utils/getFileNameFromPath";
import SearchType from "../../types/SearchType.enum";
import { useSearchContext } from "../../contexts/SearchContext";
import getFileType from "../../utils/getFileType";

export default function useSearch() {
  const {
    searchString,
    setSearchString,
    searchType,
    setSearchType,
    enableSearch,
    setEnableSearch,
    queryEngine
  } = useSearchContext();
  const {
    data: files,
    isError,
    isLoading,
    isSuccess,
    error,
    status
  } = useQuery({
    queryKey: ["search", searchString, searchType, queryEngine],
    queryFn: () => {
      if (searchType === SearchType.IMAGE) {
        console.log("Image query", searchString, queryEngine);
        return searchService(searchString, queryEngine, SearchType.IMAGE);
      } else if (searchType === SearchType.TEXT) {
        console.log("Text query", searchString, queryEngine);
        return searchService(searchString, queryEngine, SearchType.TEXT);
      }
    },
    enabled: enableSearch,
    staleTime: Infinity
  });
  const search = (query: string, searchType: SearchType) => {
    setSearchString(query);
    setSearchType(searchType);
    setEnableSearch(true);
  };

  return {
    search,
    files: files?.map(
      (file: { path: string; score: number; pages: number[] }) => ({
        path: file.path,
        score: file.score,
        pages: file.pages,
        name: getFileNameFromPath(file.path),
        type: getFileType(file.path)
      })
    ),
    enableSearch,
    isError,
    isLoading,
    isSuccess,
    error,
    status
  };
}
