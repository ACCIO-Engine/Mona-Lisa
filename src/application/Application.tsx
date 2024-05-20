import React from "react";
import { SearchProvider } from "./contexts/SearchContext";
import { FiltersProvider } from "./contexts/FiltersContext";

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <SearchProvider>
      <FiltersProvider>{children}</FiltersProvider>
    </SearchProvider>
  );
};
