import React from "react";
import { SearchProvider } from "./contexts/SearchContext";

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return <SearchProvider>{children}</SearchProvider>;
};
