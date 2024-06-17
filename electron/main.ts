/* eslint-disable @typescript-eslint/no-var-requires */
import { app, BrowserWindow, dialog, ipcMain as ipc } from "electron";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import os from "node:os";
import fs from "fs";
// import Store from 'electron-store'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

function createWindow(): void {
  console.log("Creating window");
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "icon.png"),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false
    }
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL != null) {
    void win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    void win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("ready", () => {
  // Read the configuration file
  fs.readFile(path.resolve(__dirname, "../../Octopus/config.json"), (err, data) => {
    if (err) {
      console.error("Error reading configuration file:", err);
      return;
    }

    try {
      const config = JSON.parse(data.toString());
      // Apply configuration settings here
      // For example, set window dimensions
      if (config.width && config.height) {
        mainWindow.setSize(config.width, config.height);
      }
    } catch (err) {
      console.error("Error parsing configuration file:", err);
    }

    // Create the application window after reading the configuration
    createWindow();
  });
});


process.env.HEDWIG = path.join(__dirname, "../../Hedwig");
process.env.NANOBERT = path.join(__dirname, "../../text-semantic-search");
process.env.CHROMADB = path.join(__dirname, "../../Octopus");
process.env.OCTOPUS = path.join(__dirname, "../../Octopus");
process.env.AUTO_COMPLETE = path.join(__dirname, "../AutoComplete");

// const store = new Store()


function runShellCommand(command: string, cwd: string | undefined): any {
  const child = spawn(command, {
    // stdio: 'inherit',
    shell: true,
    cwd,
    killSignal: "SIGINT"
  });
  return child;
}

// const test = runShellCommand('python server.py')

function stopShellCommand(child: any): void {
  console.log("Stopping the command");
  if (child != null) {
    console.log("Killing the child process");
    if (os.platform() === "win32" || os.platform() === "win64") {
      console.log(`pid = ${child.pid}`);
      spawnSync("taskkill", ["/pid", child.pid, "/f", "/t"]);
    } else if (os.platform() === "linux") {
      spawnSync("kill", ["-9", child.pid]);
    }
    child = null;
  }
}

module.exports = { runShellCommand, stopShellCommand };

const runAutoComplete = (): any => {
  return runShellCommand("npm start", process.env.AUTO_COMPLETE);
};

// IPC
const runHedwig = (): any => {
  return runShellCommand("python server.py", process.env.HEDWIG);
};

const runNanoBert = (): any => {
  return runShellCommand("python server.py", process.env.NANOBERT);
};

const runChromaDB = (): any => {
  return runShellCommand(
    "chroma run --path AccioVecDB --port 8006",
    process.env.CHROMADB
  );
};

const runOctopus = (): any => {
  return runShellCommand(" java -jar ./Octopus-0.01.jar", process.env.OCTOPUS);
};


const stopHedwig = (child: any): void => {
  stopShellCommand(child);
};

const stopNanoBert = (child: any): void => {
  stopShellCommand(child);
};

const stopChromaDB = (child: any): void => {
  stopShellCommand(child);
};

const stopOctopus = (child: any): void => {
  stopShellCommand(child);
};

const connectProcess = (eventName: string, runProcess: () => any, stopProcess: (child: any) => void): void => {
  ipc.on(`${eventName}-start`, (event) => {
    const child = runProcess();
    console.log(`ID = ${child.pid}`);
    child.stdout.on("data", (data: any) => {
      console.log(`${data}`);
      event.reply(`${eventName}-data`, `${data}`);
    });

    child.stderr.on("data", (data: any) => {
      console.log(`${data}`);
      event.reply(`${eventName}-data`, `${data}`);
    });

    child.on("close", (code: number) => {
      console.log(`child process exited with code ${code}`);
      event.reply(
        `${eventName}-data`,
        `child process exited with code ${code}`
      );
    });

    ipc.on(`${eventName}-stop`, () => {
      console.log("Stop event received");
      stopProcess(child);
      // event.reply(`${eventName}-data`, 'Command stopped')
    });

    app.on("will-quit", () => {
      // Perform tasks such as notifying the user or confirming action
      console.log("Trying to kill process");
      if (child != null)
        stopProcess(child);
    });
  });
};

connectProcess("hedwig", runHedwig, stopHedwig);

connectProcess("nanobert", runNanoBert, stopNanoBert);

connectProcess("chromadb", runChromaDB, stopChromaDB);

ipc.on("open-select-dirs-dialog", function(event) {
  dialog.showOpenDialog(win, {
    properties: ["openDirectory", "multiSelections"]
  }).then(result => {
    event.sender.send("selected-dirs", result.filePaths, result.canceled);
  }).catch(err => {
    console.error(err);
  });
});

ipc.on("open-select-ignore-dirs-dialog", function(event) {
  dialog.showOpenDialog(win, {
    properties: ["openDirectory", "multiSelections"]
  }).then(result => {
    event.sender.send("selected-ignore-dirs", result.filePaths, result.canceled);
  }).catch(err => {
    console.error(err);
  });
});

ipc.on("open-select-image-dialog", function(event) {
  dialog.showOpenDialog(win, {
    properties: ["openFile"],
    filters: [
      { name: "Images", extensions: ["jpg", "jpeg", "png", "gif"] }
    ]
  }).then(result => {
    if (!result.canceled && result.filePaths.length > 0) {
      const imagePath = result.filePaths[0];

      // Split the path string by the directory separator
      const pathParts = imagePath.split("\\");

      // Extract the last part (filename) from the path
      const filename = pathParts[pathParts.length - 1];

      event.sender.send("selected-image-path", filename);
    }
  }).catch(err => {
    console.error(err);
  });
});

ipc.on("select-DBpath", function(event) {
  dialog.showOpenDialog(win, {
    properties: ["openDirectory"]
  }).then(result => {
    event.sender.send("selected-DBpath", result.filePaths[0], result.canceled);
    console.log("Selected folder:", result.filePaths[0]);
  }).catch(err => {
    console.error(err);
  });
});

ipc.on("save", (sender, data) => {
  console.log(data);
  // save data to json file but first convert crawledPaths and ignoredPaths to list
  data.paths = Array.from(data.paths);
  data.ignoredPaths = Array.from(data.ignoredPaths);
  const jsonData = JSON.stringify(data);
  const filePath = path.join(__dirname, "../../Octopus/config.json");
  fs.writeFileSync(filePath, jsonData);
  console.log("config saved to JSON file:", filePath);
});

// receive config request from renderer process
ipc.on("get-config", (event) => {
  const filePath = path.join(__dirname, "../../Octopus/config.json");
  const data = fs.readFileSync(filePath, "utf8");
  const config = JSON.parse(data);
  console.log(config);
  event.sender.send("config", config);
});

ipc.handle("read-file", async (_event, filePath) => {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
});
connectProcess("octopus", runOctopus, stopOctopus);

runAutoComplete();
