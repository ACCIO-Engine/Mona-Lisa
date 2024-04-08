import React from 'react'
import DashboardAccordion from '../../components/DashboardAccordion/DashboardAccordion'
import { Box } from '@mui/material'
import DashboardEntry from '../../../application/types/DashboardEntry.enum'

const Dashboard: React.FC = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
        <DashboardAccordion title={DashboardEntry.HEDWIG}/>
        <DashboardAccordion title={DashboardEntry.NANO_BERT}/>
        <DashboardAccordion title={DashboardEntry.CHROMA_DB}/>
    </Box>
  )
}

export default Dashboard
