import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import {
  AccordionHeader,
  AccordionTitle,
  LogsContainer,
  LogsTypography,
  StartButton
} from './DashboardAccordion.styled'

interface DashboardAccordionProps {
  title: string
}

const DashboardAccordion: React.FC<DashboardAccordionProps> = (
  props: DashboardAccordionProps
) => {
  const [expanded, setExpanded] = React.useState<boolean>(false)
  const [logs, setLogs] = useState('')

  const { title } = props

  const ipcRenderer = (window as any).ipcRenderer
  const startChannel = `${title}-start`
  const stopChannel = `${title}-stop`
  const dataChannel = `${title}-data`

  const handleStart = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    ipcRenderer.send(startChannel)
  }
  const handleStop = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    ipcRenderer.send(stopChannel)
  }

  const handleChange =
    () => (event: React.SyntheticEvent, isExpanded: boolean) => {
      console.log(isExpanded)
      console.log(expanded)
      setExpanded(isExpanded)
    }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log('adham')
  }

  useEffect(() => {
    ipcRenderer.on(dataChannel, (event, arg) => {
      console.log(event)
      // concatenate the logs
      setLogs((logs) => `${logs}${arg}`)
    })
    return () => {
      ipcRenderer.removeAllListeners(dataChannel)
    }
  }, [])

  return (
    <div>
      <Accordion expanded={expanded} onChange={handleChange()}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <AccordionHeader>
            <AccordionTitle>Hedwig</AccordionTitle>
            <StartButton aria-label="run" disableFocusRipple={true} disableRipple={true}>
              <PlayArrowIcon />
            </StartButton>
          </AccordionHeader>
        </AccordionSummary>
        <LogsContainer>
          <AccordionDetails>
            <LogsTypography>{logs}</LogsTypography>
          </AccordionDetails>
        </LogsContainer>
      </Accordion>
    </div>
  )
}

export default DashboardAccordion
