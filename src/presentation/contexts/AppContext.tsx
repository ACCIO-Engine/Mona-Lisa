import React, { createContext, useContext, useState } from "react";

interface AppStateContextProps {
  isLightMode: boolean;
  toggleLightMode: () => void;
}

const AppStateContext = createContext<AppStateContextProps | undefined>(
  undefined
);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLightMode, setLightMode] = useState(true);

  const toggleLightMode = (): void => {
    setLightMode((prevMode) => !prevMode);
  };

  return (
    <AppStateContext.Provider value={{ isLightMode, toggleLightMode }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppStateContextProps => {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }

  return context;
};
