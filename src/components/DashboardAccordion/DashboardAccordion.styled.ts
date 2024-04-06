import { Box, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const LogsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[200]
}))

export const LogsTypography = styled(Typography)(({ theme }) => ({
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
  fontWeight: 400,
  maxHeight: 400,
  overflowY: 'auto'
}))

export const AccordionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600
}))

export const AccordionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}))

export const StartButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.success.main
}))

export const StopButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.error.main
}))
