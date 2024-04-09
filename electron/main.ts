/* eslint-disable @typescript-eslint/no-var-requires */
import { app, BrowserWindow, dialog, ipcMain as ipc } from 'electron'
import path from 'node:path'
import { spawn, spawnSync } from 'node:child_process'
import os from 'node:os'
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
  console.log('Creating window')
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "icon.png"),
    autoHideMenuBar: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
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

void app.whenReady().then(createWindow)

process.env.HEDWIG = path.join(__dirname, '../../Hedwig')
process.env.NANOBERT = path.join(__dirname, '../../text-semantic-search')
process.env.CHROMADB = path.join(__dirname, '../../Octopus')

// const store = new Store()



function runShellCommand(command: string, cwd: string | undefined): any {
  const child = spawn(command, {
    // stdio: 'inherit',
    shell: true,
    cwd,
    killSignal: 'SIGINT'
  })
  return child
}

// const test = runShellCommand('python server.py')

function stopShellCommand(child: any): void {
  console.log('Stopping the command')
  if (child != null) {
    console.log('Killing the child process')
    if (os.platform() === 'win32' || os.platform() === 'win64') {
      console.log(`pid = ${child.pid}`)
      spawnSync('taskkill', ['/pid', child.pid, '/f', '/t'])
    }
    else if (os.platform() === 'linux') {
      spawnSync('kill', ['-9', child.pid])
    }
    child = null
  }
}

module.exports = { runShellCommand, stopShellCommand }

// IPC
const runHedwig = (): any => {
  return runShellCommand('python server.py', process.env.HEDWIG)
}

const runNanoBert = (): any => {
  return runShellCommand('python server.py', process.env.NANOBERT)
}

const runChromaDB = (): any => {
  return runShellCommand('chroma run --path AccioVecDB --port 8006', process.env.CHROMADB)
}

const stopHedwig = (child: any): void => {
  stopShellCommand(child)
}

const stopNanoBert = (child: any): void => {
  stopShellCommand(child)
}

const stopChromaDB = (child: any): void => {
  stopShellCommand(child)
}

const connectProcess = (eventName: string, runProcess: () => any, stopProcess: (child: any) => void): void => {
  ipc.on(`${eventName}-start`, (event) => {
    const child = runProcess()
    console.log(`ID = ${child.pid}`)
    child.stdout.on('data', (data: any) => {
      console.log(`${data}`)
      event.reply(`${eventName}-data`, `${data}`)
    })

    child.stderr.on('data', (data: any) => {
      console.log(`${data}`)
      event.reply(`${eventName}-data`, `${data}`)
    })

    child.on('close', (code: number) => {
      console.log(`child process exited with code ${code}`)
      event.reply(`${eventName}-data`, `child process exited with code ${code}`)
    })

    ipc.on(`${eventName}-stop`, () => {
      console.log('Stop event received')
      stopProcess(child)
      // event.reply(`${eventName}-data`, 'Command stopped')
    })

    app.on('will-quit', () => {
      // Perform tasks such as notifying the user or confirming action
      console.log("Trying to kill process")
      if (child != null)
        stopProcess(child)
    });
  })
}

connectProcess('hedwig', runHedwig, stopHedwig)

connectProcess('nanobert', runNanoBert, stopNanoBert)

connectProcess('chromadb', runChromaDB, stopChromaDB)

ipc.on('open-select-dirs-dialog', function (event) {
  dialog.showOpenDialog(win, {
    properties: ['openDirectory', 'multiSelections']
  }).then(result => {
    event.sender.send('selected-dirs', result.filePaths, result.canceled);
  }).catch(err => {
    console.error(err);
  });
})

ipc.on('open-select-ignore-dirs-dialog', function (event) {
  dialog.showOpenDialog(win, {
    properties: ['openDirectory', 'multiSelections']
  }).then(result => {
    event.sender.send('selected-ignore-dirs', result.filePaths, result.canceled);
  }).catch(err => {
    console.error(err);
  });
})

ipc.on('open-select-image-dialog', function (event) {
  dialog.showOpenDialog(win, {
    properties: ['openFile'],
    filters: [
      { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] }
    ]
  }).then(result => {
    if (!result.canceled && result.filePaths.length > 0) {
      const imagePath = result.filePaths[0];

      // Split the path string by the directory separator
      const pathParts = imagePath.split("\\");

      // Extract the last part (filename) from the path
      const filename = pathParts[pathParts.length - 1];

      event.sender.send('selected-image-path', filename);
    }
  }).catch(err => {
    console.error(err);
  });
})

ipc.on('select-DBpath', function (event) {
  dialog.showOpenDialog(win, {
    properties: ['openDirectory',]
  }).then(result => {
    if (!result.canceled && result.filePaths.length > 0) {
      const folderPath = result.filePaths[0];
      // Do something with the selected folder path
      event.sender.send('selected-DBpath', folderPath);
      console.log('Selected folder:', folderPath);
    }
  }).catch(err => {
    console.error(err);
  });
})