import { useQuery } from "@tanstack/react-query";
import { search as searchService } from "../../../infrastructure";
import getFileNameFromPath from "../../utils/getFileNameFromPath";
import SearchType from "../../types/SearchType.enum";
import { useSearchContext } from "../../contexts/SearchContext";
import getFileType from "../../utils/getFileType";
import { useFiltersContext } from "../../contexts/FiltersContext";
import { FileTypes, FileSizes } from "../../types/SearchOptions";
import { CBIREngines } from "../../types/QueryEngines.enum";

export default function useSearch() {
  const {
    searchString,
    setSearchString,
    searchType,
    setSearchType,
    enableSearch,
    setEnableSearch,
    queryEngine,
    pageSize,
    page,
    setPage,
    showResults,
    setShowResults,
    rerank,
    cbirEngine,
    setCBIREngine,
  } = useSearchContext();
  const { startDate, endDate, size, fileType, searchByFileName } = useFiltersContext();
  const {
    data: files,
    isError,
    isLoading,
    isSuccess,
    error,
    status
  } = useQuery({
    queryKey: ["search", searchString, searchType, queryEngine, fileType, pageSize, page, size, searchByFileName, startDate, endDate, rerank],
    queryFn: () => {
      const fileTypes: string[] = (Object.keys(fileType) as (keyof FileTypes)[])
        .filter((key) => fileType[key])
        .map((key) => key.toUpperCase());
      const fileSizes: string[] = (Object.keys(size) as (keyof FileSizes)[])
        .filter((key) => size[key])
        .map((key) => key.toUpperCase());
      console.log("query", searchString, searchType, queryEngine, fileTypes, fileSizes);
      if (searchType === SearchType.IMAGE) {
        return searchService({
          query: searchString,
          queryEngine: queryEngine,
          cbirEngine: cbirEngine,
          searchType: SearchType.IMAGE,
          fileTypes: fileTypes,
          fileSizes: fileSizes,
          pageSize: pageSize,
          page: page - 1,
          searchByFileName: searchByFileName,
          modifiedTimeStart: startDate?.toDate(),
          modifiedTimeEnd: endDate?.toDate(),
          rerank: rerank
        });
      } else if (searchType === SearchType.TEXT) {
        return searchService({
          query: searchString,
          queryEngine: queryEngine,
          cbirEngine: cbirEngine,
          searchType: SearchType.TEXT,
          fileTypes: fileTypes,
          fileSizes: fileSizes,
          pageSize: pageSize,
          page: page - 1,
          searchByFileName: searchByFileName,
          modifiedTimeStart: startDate?.toDate(),
          modifiedTimeEnd: endDate?.toDate(),
          rerank: rerank
        });
      }
    },
    enabled: enableSearch,
    staleTime: Infinity
  });
  const search = (query: string, searchType: SearchType, cbirEngine: CBIREngines = CBIREngines.NONE) => {
    setPage(1);
    setSearchString(query);
    setSearchType(searchType);
    setEnableSearch(true);
    setCBIREngine(cbirEngine);
  };
  console.log("files", files);
  return {
    search,
    files: files?.results.map(
      (file: { path: string; score: number; pages: number[] }) => ({
        path: file.path,
        score: file.score,
        pages: file.pages,
        name: getFileNameFromPath(file.path),
        type: getFileType(file.path)
      })
    ),
    totalPages: files?.totalPages,
    totalResults: files?.totalResults,
    currentPage: files?.currentPage,
    showResults,
    setShowResults,
    enableSearch,
    isError,
    isLoading,
    isSuccess,
    error,
    status
  };
}
