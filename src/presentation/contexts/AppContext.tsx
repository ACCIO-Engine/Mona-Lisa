import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage.ts";

interface AppStateContextProps {
  isLightMode: boolean;
  toggleLightMode: () => void;
}

const AppStateContext = createContext<AppStateContextProps | undefined>(
  undefined
);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                            children
                                                                          }) => {
  const [isLightMode, setLightMode] = useLocalStorage("isLightMode", "true");

  const toggleLightMode = (): void => {
    setLightMode(isLightMode === "true" ? "false" : "true");
  };

  return (
    <AppStateContext.Provider value={{ isLightMode: isLightMode === "true", toggleLightMode }}>
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
