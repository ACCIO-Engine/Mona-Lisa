import React from 'react'
import DashboardAccordion from '../../components/DashboardAccordion/DashboardAccordion'
import { Box } from '@mui/material'

const Dashboard: React.FC = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
        <DashboardAccordion title='hedwig'/>
        <DashboardAccordion title='nanobert'/>
        <DashboardAccordion title='chromadb'/>
    </Box>
  )
}

export default Dashboard
