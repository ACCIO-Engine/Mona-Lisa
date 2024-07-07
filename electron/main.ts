/* eslint-disable @typescript-eslint/no-var-requires */
// imports
import { app, BrowserWindow, dialog, ipcMain as ipc, Tray, Menu, MenuItem } from "electron";
import path from "node:path";
import { spawn, spawnSync, exec } from "node:child_process";
import os from "node:os";
import fs from "fs";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │

// Set the environment variables
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");


// window object and related function and events
let win: BrowserWindow | null;
let close: boolean = false;
let server: any = null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

// handlers
function showAppHandler(mainWindow): void {
  mainWindow.show();
}

function quitAppHandler(): void {
  close = true;
  app.quit();
  win = null;
}

function trayDoubleClickHandler(mainWindow): void {
  mainWindow.show();
}

function closeWindowHandler(event): void {
  if (!close) {
    console.log("Window close event");
    event.preventDefault();
    win!.hide();
  }
  else {
    stopServer(server);
  }
}

function allWindowsClosedHandler(): void {
  console.log("Window all closed event");
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
}

function activateAppHandler(): void {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  console.log("Activate event");
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}

function readyAppHandler(): void {
  console.log("App ready event");
  createWindow();
}

function createTray(iconPath: string, mainWindow: BrowserWindow): void {
  const tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    { label: `Open ${app.getName()}`, click: showAppHandler.bind(null, mainWindow) },
    { label: `Quit ${app.getName()}`, click: quitAppHandler }
  ]);
  tray.setToolTip(app.getName());
  tray.setContextMenu(contextMenu);

  tray.on('double-click', trayDoubleClickHandler.bind(null, mainWindow));
}

function createWindow(): void {
  server = runServer();
  console.log("Creating window");
  const iconPath = path.join(process.env.VITE_PUBLIC, "icon.png");
  // create window
  win = new BrowserWindow({
    icon: iconPath,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
      spellcheck: true,
      devTools: true,
    }
  });
  // remove the default menu
  win.removeMenu();
  win.webContents.openDevTools();

  // Create tray to make hidden window effect
  createTray(iconPath, win);

  // add events
  win.on('close', closeWindowHandler);

  win.webContents.session.setSpellCheckerLanguages(['en-US'])

  win.webContents.on('context-menu', (event, params) => {
    const { isEditable } = params;
    if (!isEditable) return;
    const menu = new Menu()

    // Add each spelling suggestion
    for (const suggestion of params.dictionarySuggestions) {
      menu.append(new MenuItem({
        label: suggestion,
        click: () => win.webContents.replaceMisspelling(suggestion)
      }))
    }

    // Allow users to add the misspelled word to the dictionary
    if (params.misspelledWord) {
      menu.append(
        new MenuItem({
          label: 'Add to dictionary',
          click: () => win.webContents.session.addWordToSpellCheckerDictionary(params.misspelledWord)
        })
      )
    }

    menu.popup()
  })

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL != null) {
    void win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    void win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", allWindowsClosedHandler);

app.on("activate", activateAppHandler);

app.on("ready", readyAppHandler);


// IPC
process.env.HEDWIG = path.join(__dirname, "../../Hedwig");
process.env.NANOBERT = path.join(__dirname, "../../text-semantic-search");
process.env.CHROMADB = path.join(__dirname, "../../Konan");
process.env.OCTOPUS = path.join(__dirname, "../../Octopus");
process.env.AUTO_COMPLETE = path.join(__dirname, "../AutoComplete");

function runShellCommand(command: string, cwd: string | undefined): any {
  const child = spawn(command, {
    // stdio: 'inherit',
    shell: true,
    cwd,
    killSignal: "SIGINT"
  });
  return child;
}

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

const runAutoComplete = (): any => {
  return runShellCommand("npm start", process.env.AUTO_COMPLETE);
};

const runHedwig = (): any => {
  return runShellCommand("python server.py", process.env.HEDWIG);
};

const runNanoBert = (): any => {
  return runShellCommand("python server2.py", process.env.NANOBERT);
};

const runChromaDB = (): any => {
  return runShellCommand(
    "python chroma.py",
    process.env.CHROMADB
  );
};

const runOctopus = (): any => {
  const child = runShellCommand(" java -jar ./indexing.jar", process.env.OCTOPUS);
  runAutoComplete();
  return child;
};

const runServer = (): any => {
  return runShellCommand("java -jar ./server.jar", process.env.OCTOPUS);
}


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

const stopServer = (child: any): void => {
  stopShellCommand(child);
}

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

connectProcess("octopus", runOctopus, stopOctopus);

ipc.on('open-folder', (event, folderPath) => {
  if (process.platform === 'win32') {
    const pathParts = folderPath.split(/[\\/]/);
    pathParts.pop(); // Remove the file name
    const dir = pathParts.join('\\');
    exec(`start "" "${dir}"`);
  } else if (process.platform === 'linux') {
    const pathParts = folderPath.split('/');
    pathParts.pop(); // Remove the file name
    const dir = pathParts.join('/');
    exec(`xdg-open "${dir}"`);
  }
});

ipc.on('open-office', (event, path) => {
  if (process.platform === 'win32') {
    exec(`start "" "${path}"`);
  } else if (process.platform === 'linux') {
    exec(`xdg-open "${path}"`);
  }
});

ipc.on("open-select-dirs-dialog", function (event) {
  dialog.showOpenDialog(win, {
    properties: ["openDirectory", "multiSelections"]
  }).then(result => {
    event.sender.send("selected-dirs", result.filePaths, result.canceled);
  }).catch(err => {
    console.error(err);
  });
});

ipc.on("open-select-ignore-dirs-dialog", function (event) {
  dialog.showOpenDialog(win, {
    properties: ["openDirectory", "multiSelections"]
  }).then(result => {
    event.sender.send("selected-ignore-dirs", result.filePaths, result.canceled);
  }).catch(err => {
    console.error(err);
  });
});

ipc.on("open-select-image-dialog", function (event) {
  dialog.showOpenDialog(win, {
    properties: ["openFile"],
    filters: [
      { name: "Images", extensions: ["jpg", "jpeg", "png", "gif"] }
    ]
  }).then(result => {
    if (!result.canceled && result.filePaths.length > 0) {
      event.sender.send("selected-image-path", result.filePaths[0]);
    }
  }).catch(err => {
    console.error(err);
  });
});

ipc.on("select-DBpath", function (event) {
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

