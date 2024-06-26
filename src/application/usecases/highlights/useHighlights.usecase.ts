import { useSearchContext } from "../../contexts/SearchContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { getHighlightsService } from "../../../infrastructure";
import { useState } from "react";

export default function useHighlights(): {
  getHighlights: (path: string) => Promise<any>;
  highlights: {
    content: string;
    highlights: {
      startInd: number;
      endInd: number;
      type: "Exact" | "Fuzzy";
    }[];
  };
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  error: any;
  status: string;
} {
  const {
    searchString,
    queryEngine
  } = useSearchContext();
  const [path, setPath] = useState<string>("");
  const {
    data: highlights,
    isError,
    isLoading,
    isSuccess,
    error,
    status
  } = useQuery({
    queryKey: ["highlights", searchString, queryEngine, path],
    queryFn: () => {
      return getHighlightsService(searchString, path, queryEngine);
    },
    staleTime: Infinity
  });
  const getHighlights = (path: string) => {
    setPath(path);
    return getHighlightsService(searchString, path, queryEngine);
  };
  // console.log("highlights", highlights);
  return {
    getHighlights,
    highlights,
    isError,
    isLoading,
    isSuccess,
    error,
    status
  };
}