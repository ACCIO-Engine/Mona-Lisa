import { useQuery } from "@tanstack/react-query";
import { search as searchService } from "../../../infrastructure";
import getFileNameFromPath from "../../utils/getFileNameFromPath";
import SearchType from "../../types/SearchType.enum";
import { useSearchContext } from "../../contexts/SearchContext";
import getFileType from "../../utils/getFileType";
import { useFiltersContext } from "../../contexts/FiltersContext";
import { FileTypes } from "../../types/SearchOptions";

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
  const { timeModified, size, fileType } = useFiltersContext();
  const {
    data: files,
    isError,
    isLoading,
    isSuccess,
    error,
    status
  } = useQuery({
    queryKey: ["search", searchString, searchType, queryEngine, fileType],
    queryFn: () => {
      const fileTypes: string[] = (Object.keys(fileType) as (keyof FileTypes)[])
        .filter((key) => fileType[key])
        .map((key) => key.toUpperCase());
      console.log("query", searchString, queryEngine, fileTypes, fileTypes);
      if (searchType === SearchType.IMAGE) {
        return searchService({
          query: searchString,
          queryEngine: queryEngine,
          searchType: SearchType.IMAGE,
          fileTypes: fileTypes
        });
      } else if (searchType === SearchType.TEXT) {
        return searchService({
          query: searchString,
          queryEngine: queryEngine,
          searchType: SearchType.TEXT,
          fileTypes: fileTypes
        });
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
