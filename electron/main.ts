/* eslint-disable @typescript-eslint/no-var-requires */
import { app, BrowserWindow, ipcMain as ipc } from 'electron'
import path from 'node:path'
import { spawn } from 'node:child_process'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

function createWindow (): void {
  console.log('Creating window')
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date()).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL != null) {
    void win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    void win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

void app.whenReady().then(createWindow)

process.env.HEDWIG = path.join(__dirname, '../../Hedwig')

function runShellCommand (command: string): any {
  const child = spawn(command, {
    // stdio: 'inherit',
    shell: true,
    cwd: process.env.HEDWIG,
    killSignal: 'SIGINT'
  })
  return child
}

// const test = runShellCommand('python server.py')

function stopShellCommand (child: any): void {
  console.log('Stopping the command')
  if (child != null) {
    console.log('Killing the child process')
    spawn('taskkill', ['/pid', child.pid, '/f', '/t'])
  }
}

// setTimeout(() => {
//   stopShellCommand(test)
//   console.log('Command stopped')
// }, 10000)

module.exports = { runShellCommand, stopShellCommand }
// module.exports = stopShellCommand

// IPC
const runHedwig = (): any => {
  return runShellCommand('python server.py')
}

const stopHedwig = (child: any): void => {
  stopShellCommand(child)
}

const connectProcess = (eventName: string, runProcess: () => any, stopProcess: (child: any) => void): void => {
  ipc.on(`${eventName}-start`, (event) => {
    const child = runProcess()
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
  })
}

connectProcess('hedwig', runHedwig, stopHedwig)
