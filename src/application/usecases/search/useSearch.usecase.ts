import { useQuery } from "@tanstack/react-query";
import { searchImage } from "../../../infrastructure";
import getFileNameFromPath from "../../utils/getFileNameFromPath";
import SearchType from "../../types/SearchType.enum";
import { useSearchContext } from "../../contexts/SearchContext";

export default function useSearch() {
  const {
    searchString,
    setSearchString,
    searchType,
    setSearchType,
    enableSearch,
    setEnableSearch
  } = useSearchContext();
  const {
    data: files,
    isError,
    isLoading,
    isSuccess,
    error,
    status
  } = useQuery({
    queryKey: ["search", searchString, searchType],
    queryFn: () => {
      if (searchType === SearchType.IMAGE) {
        return searchImage(searchString);
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
        name: getFileNameFromPath(file.path)
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
