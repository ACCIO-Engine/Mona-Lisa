import React from 'react'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { CustomDrawer, DrawerHeader, StyledList } from './AccioDrawer.styled'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SearchIcon from '@mui/icons-material/Search'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner'
import SettingsIcon from '@mui/icons-material/Settings'
import LightLogo from '../../assets/LightACCIO.svg'
import DarkLogo from '../../assets/DarkACCIO.svg'
import { Link } from 'react-router-dom'

interface AccioDrawerProps {
  open: boolean
  handleDrawerClose: () => void
  isLightMode: boolean
}

const AccioDrawer: React.FC<AccioDrawerProps> = (props: AccioDrawerProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const buttonProps = (value: number) => ({
    selected: selectedIndex === value,
    onClick: () => { setSelectedIndex(value) }
  })

  const { open, handleDrawerClose, isLightMode } = props
  const theme = useTheme()

  return (
    <CustomDrawer variant="permanent" open={open}>
      <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {isLightMode
          ? (
          <img alt="" src={LightLogo} width={100} height={50} />
            )
          : (
          <img alt="" src={DarkLogo} width={100} height={50} />
            )}
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl'
            ? (
            <ChevronRightIcon />
              )
            : (
            <ChevronLeftIcon />
              )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <StyledList isLightMode={isLightMode}>
      <Link to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>
        <ListItem key="Dashboard" disablePadding>
          <ListItemButton {...buttonProps(0)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      </Link>
        <Link to="/search" style={{ color: 'inherit', textDecoration: 'none' }}>
          <ListItem key="Search Mode" disablePadding>
            <ListItemButton {...buttonProps(1)}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search Mode" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/index" style={{ color: 'inherit', textDecoration: 'none' }}>
          <ListItem key="Indexing Mode" disablePadding>
            <ListItemButton {...buttonProps(2)}>
              <ListItemIcon>
                <DocumentScannerIcon />
              </ListItemIcon>
              <ListItemText primary="Indexing Mode" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to="/settings"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <ListItem key="Settings" disablePadding>
            <ListItemButton {...buttonProps(3)}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </Link>
      </StyledList>
    </CustomDrawer>
  )
}

export default AccioDrawer
