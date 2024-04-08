import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import {
  AccordionHeader,
  AccordionTitle,
  LogsContainer,
  LogsTypography,
  StartButton,
  StopButton
} from './DashboardAccordion.styled'

import { useDashboardContext } from '../../contexts/DashboardContext'
import DashboardEntry from '../../../application/types/DashboardEntry.enum'

interface DashboardAccordionProps {
  title: DashboardEntry
}

const DashboardAccordion: React.FC<DashboardAccordionProps> = (
  props: DashboardAccordionProps
) => {
  const { title } = props
  const startChannel = `${title}-start`
  const stopChannel = `${title}-stop`

  const { state, clearLogs, setIsStarted, setExpanded, ipcRenderer } = useDashboardContext()
  const { logs, isStarted, expanded } = state[title]

  const handleStart = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log('start')
    e.stopPropagation()
    clearLogs(title)
    ipcRenderer.send(startChannel)
    setIsStarted(title, true)
    setExpanded(title, true)
  }
  const handleStop = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    ipcRenderer.send(stopChannel)
    setIsStarted(title, false)
    setExpanded(title, false)
  }

  const handleChange =
    () => (event: React.SyntheticEvent, isExpanded: boolean) => {
      console.log(isExpanded)
      console.log(expanded)
      setExpanded(title, isExpanded)
    }

  return (
    <div>
      <Accordion expanded={expanded} onChange={handleChange()}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <AccordionHeader>
            <AccordionTitle>{title}</AccordionTitle>
            {!isStarted
              ? (
              <StartButton
                aria-label="run"
                disableFocusRipple={true}
                disableRipple={true}
                onClick={handleStart}
              >
                <PlayArrowIcon />
              </StartButton>
                )
              : (
              <StopButton
                aria-label="stop"
                disableFocusRipple={true}
                disableRipple={true}
                onClick={handleStop}
              >
                <StopIcon />
              </StopButton>
                )}
          </AccordionHeader>
        </AccordionSummary>
        <AccordionDetails>
          <LogsContainer>
            <LogsTypography>{logs}</LogsTypography>
          </LogsContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default DashboardAccordion
