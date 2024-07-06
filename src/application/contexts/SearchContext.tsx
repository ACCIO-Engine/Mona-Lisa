import React, { createContext, useContext, useState } from "react";
import SearchType from "../types/SearchType.enum";
import QueryEngines, { CBIREngines } from "../types/QueryEngines.enum";

interface SearchContextProps {
  searchString: string;
  setSearchString: (searchString: string) => void;
  searchType: SearchType;
  setSearchType: (searchType: SearchType) => void;
  enableSearch: boolean;
  setEnableSearch: (enableSearch: boolean) => void;
  queryEngine: QueryEngines;
  setQueryEngine: (queryEngine: QueryEngines) => void;
  cbirEngine: CBIREngines;
  setCBIREngine: (cbirEngine: CBIREngines) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  page: number;
  setPage: (page: number) => void;
  showResults: boolean;
  setShowResults: (showResults: boolean) => void;
  rerank: boolean;
  setRerank: (rerank: boolean) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                          children
                                                                        }) => {
  const [searchString, setSearchString] = useState<string>("");
  const [searchType, setSearchType] = useState<SearchType>(SearchType.TEXT);
  const [enableSearch, setEnableSearch] = useState<boolean>(false);
  const [queryEngine, setQueryEngine] = useState<QueryEngines>(
    QueryEngines.TFIDF
  );
  const [cbirEngine, setCBIREngine] = useState<CBIREngines>(CBIREngines.NONE);
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [rerank, setRerank] = useState<boolean>(false);
  return (
    <SearchContext.Provider
      value={{
        searchString,
        setSearchString,
        searchType,
        setSearchType,
        enableSearch,
        setEnableSearch,
        queryEngine,
        setQueryEngine,
        cbirEngine,
        setCBIREngine,
        pageSize,
        setPageSize,
        page,
        setPage,
        showResults,
        setShowResults,
        rerank,
        setRerank
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = (): SearchContextProps => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }

  return context;
};
