/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process')
const path = require('node:path')

process.env.HEDWIG = path.join(__dirname, '../../Hedwig')

// Function to run shell command
function runShellCommand (command: string): any {
  // Executing the command
  const child = exec(command)

  // Handling standard output
  child.stdout?.on('data', (data: Buffer) => {
    console.log(`stdout: ${data.toString()}`)
  })

  // Handling error output
  child.stderr?.on('data', (data: Buffer) => {
    console.error(`stderr: ${data.toString()}`)
  })

  // Handling process close event
  child.on('close', (code: number) => {
    console.log(`child process exited with code ${code}`)
  })

  return child
}

const test = runShellCommand(`cd ${process.env.HEDWIG} && python ./server.py`)

function stopShellCommand (child: any): void {
  console.log('Stopping the command')
  if (child != null) {
    console.log('Killing the child process')
    child.kill()
  }
}
// Exporting the function

// Stop the command
setTimeout(() => {
  stopShellCommand(test)
}, 20000)

module.exports = runShellCommand
