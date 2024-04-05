import React, { useEffect, useState } from 'react'

const Dashboard: React.FC = () => {
  const ipcRenderer = (window as any).ipcRenderer
  const [logs, setLogs] = useState('')
  const handleClick = (): void => {
    ipcRenderer.send('test')
  }
  useEffect(() => {
    ipcRenderer.on('test-reply', (event, arg) => {
      console.log(event)
      // concatenate the logs
      setLogs(logs => `${logs}\n${arg}`)
    })
    return () => { ipcRenderer.removeAllListeners('test-reply') }
  }, [])

  const handleStop = (): void => {
    ipcRenderer.send('stop')
  }
  return (
    <div>
        <h1>Dashboard</h1>
        <button onClick={handleClick}>run</button>
        <button onClick={handleStop}>stop</button>
        <div style={{ whiteSpace: 'pre-wrap' }}>
            {logs}
        </div>
    </div>
  )
}

export default Dashboard
