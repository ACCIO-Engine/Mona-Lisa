import { Box } from '@mui/material'
import React from 'react'
import AccioNavbar from '../Navbar/AccioNavbar'
import AccioDrawer from '../../components/Drawer/AccioDrawer'
import { DrawerHeader } from '../../components/Drawer/AccioDrawer.styled'
import { Outlet } from 'react-router-dom'
import DialogProvider from '../../components/Dialog/Dialog'
import { useAppState } from '../../contexts/AppContext'

const Root: React.FC = () => {
  const { isLightMode, toggleLightMode } = useAppState()

  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = (): void => {
    setOpen(true)
  }

  const handleDrawerClose = (): void => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <DialogProvider>
        <AccioNavbar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          isLightMode={isLightMode}
          toggleLightMode={toggleLightMode}
        />
        <AccioDrawer
          open={open}
          handleDrawerClose={handleDrawerClose}
          isLightMode={isLightMode}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </DialogProvider>
    </Box>
  )
}

export default Root
