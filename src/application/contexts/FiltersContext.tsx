import React, { createContext, useContext, useState } from "react";

interface FiltersContextProps {
  timeModified: string;
  setTimeModified: (timeModified: string) => void;
  size: {
    Empty: boolean;
    Tiny: boolean;
    Small: boolean;
    Medium: boolean;
    Large: boolean;
    Huge: boolean;
    Gigantic: boolean;

  };
  setSize: (size: {
    Empty: boolean;
    Tiny: boolean;
    Small: boolean;
    Medium: boolean;
    Large: boolean;
    Huge: boolean;
    Gigantic: boolean;
  }) => void;
  fileType: {
    Image: boolean;
    Text: boolean;
    Video: boolean;
    Audio: boolean;
  };
  setFileType: (fileType: {
    Image: boolean;
    Text: boolean;
    Video: boolean;
    Audio: boolean;
  }) => void;
  searchByFileName: boolean;
  setSearchByFileName: (searchByFileName: boolean) => void;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(
  undefined
);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                           children
                                                                         }) => {
  const [timeModified, setTimeModified] = useState("");
  const [size, setSize] = useState({
    Empty: true,
    Tiny: true,
    Small: true,
    Medium: true,
    Large: true,
    Huge: true,
    Gigantic: true
  });
  const [fileType, setFileType] = useState({
    Image: true,
    Text: true,
    Video: true,
    Audio: true
  });
  const [searchByFileName, setSearchByFileName] = useState(false);
  return (
    <FiltersContext.Provider
      value={{
        timeModified,
        setTimeModified,
        size,
        setSize,
        fileType,
        setFileType,
        searchByFileName,
        setSearchByFileName
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = (): FiltersContextProps => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error("useFiltersContext must be used within a FiltersProvider");
  }

  return context;
};
