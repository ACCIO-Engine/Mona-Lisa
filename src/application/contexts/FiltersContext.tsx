import React, { createContext, useContext, useState } from "react";

interface FiltersContextProps {
  timeModified: string;
  setTimeModified: (timeModified: string) => void;
  size: string;
  setSize: (size: string) => void;
  fileType: {
    Image: boolean;
    Document: boolean;
    Video: boolean;
    All: boolean;
  };
  setFileType: (fileType: {
    Image: boolean;
    Document: boolean;
    Video: boolean;
    All: boolean;
  }) => void;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(
  undefined
);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [timeModified, setTimeModified] = useState("");
  const [size, setSize] = useState("");
  const [fileType, setFileType] = useState({
    Image: false,
    Document: false,
    Video: false,
    All: false
  });
  return (
    <FiltersContext.Provider
      value={{
        timeModified,
        setTimeModified,
        size,
        setSize,
        fileType,
        setFileType
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
