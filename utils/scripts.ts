/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn } = require('node:child_process')
const path = require('path')

process.env.HEDWIG = path.join(__dirname, '../../Hedwig')

function runShellCommand (command: string): any {
  const child = spawn(command, {
    // stdio: 'inherit',
    shell: true,
    cwd: process.env.HEDWIG,
    killSignal: 'SIGINT'
  })

  child.stdout.on('data', (data: any) => {
    console.log(`${data}`)
  })

  child.stderr.on('data', (data: any) => {
    console.error(`${data}`)
  })

  child.on('close', (code: number) => {
    console.log(`child process exited with code ${code}`)
  })
  return child
}

const test = runShellCommand('python server.py')

function stopShellCommand (child: any): void {
  console.log('Stopping the command')
  if (child != null) {
    console.log('Killing the child process')
    spawn('taskkill', ['/pid', child.pid, '/f', '/t'])
  }
}

setTimeout(() => {
  stopShellCommand(test)
  console.log('Command stopped')
}, 10000)

module.exports = runShellCommand
