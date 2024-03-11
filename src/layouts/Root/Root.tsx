import { Box } from '@mui/material'
import React from 'react'
import AccioNavbar from '../Navbar/AccioNavbar'
import AccioDrawer from '../../components/Drawer/AccioDrawer'
import { DrawerHeader } from '../../components/Drawer/AccioDrawer.styled'
import { Outlet } from 'react-router-dom'

const Root: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = (): void => {
    setOpen(true)
  }

  const handleDrawerClose = (): void => {
    setOpen(false)
  }

  return (
      <Box sx={{ display: 'flex' }}>
        <AccioNavbar open={open} handleDrawerOpen={handleDrawerOpen} />
        <AccioDrawer open={open} handleDrawerClose={handleDrawerClose} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
  )
}

export default Root
