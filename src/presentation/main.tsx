// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AppStateProvider } from "./contexts/AppContext.tsx";
import { ApplicationProvider } from "../application/Application.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <ApplicationProvider>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </ApplicationProvider>
  // </React.StrictMode>
);

// Remove Preload scripts loading
postMessage({ payload: "removeLoading" }, "*");

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
