import React from 'react'
import theme from './theme'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

function App (): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <PermanentDrawerLeft /> */}
      {/* <MiniDrawer /> */}
        </ThemeProvider>
  )
}

export default App
