import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import ResultCard from '../../components/ResultCard/ResultCard'

const ResultsGrid: React.FC = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {arr.map((i) => (
          <Grid item md={2} xs={4} key={i}>
            <ResultCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ResultsGrid
