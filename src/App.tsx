import React from 'react'
import theme from './theme'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './layouts/Root/Root'
import Home from './pages/Home/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        // index is true to make it the default route
        index: true,
        element: <Home />
      }
      // { path: "search", element: <Search /> },
      // { path: "index", element: <Index /> },
      // { path: "settings", element: <Settings /> },
    ]
  }
]
)

function App (): React.ReactElement {
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router}/>
      {/* <PermanentDrawerLeft /> */}
      {/* <MiniDrawer /> */}
        </ThemeProvider>
  )
}

export default App
