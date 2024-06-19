import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Collapse from "@mui/material/Collapse";
import {
  ColorlibStepIconRoot,
  StyledStepContent,
  StyledStepLabel,
  LogsContainer,
  LogsTypography
} from "./Processes.styled.ts";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { useDashboardContext } from "../../../contexts/DashboardContext.tsx";
import DashboardEntry from "../../../../application/types/DashboardEntry.enum.ts";
import { Accordion, Chip, CircularProgress, Typography } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

const steps = [
  {
    label: DashboardEntry.HEDWIG,
    description: `Is responsible for generating captions for images.`
  },
  {
    label: DashboardEntry.NANO_BERT,
    description:
      "Is responsible for generating embeddings for text."
  },
  {
    label: DashboardEntry.CHROMA_DB,
    description: `Is a database that stores the embeddings generated by the Nanobert model.`
  },
  {
    label: DashboardEntry.OCTOPUS,
    description: `Is responsible for search logic.`
  }
];

function ColorlibStepIcon(props: { active?: boolean; onClick: () => void }) {
  const { active, onClick } = props;
  console.log(active);


  return (
    <Box sx={{ m: 1, position: "relative" }}>
      {active && (
        <CircularProgress
          size={60}
          thickness={2}
          sx={{
            position: "absolute",
            top: -5,
            left: -5,
            zIndex: -1
          }}
        />
      )}
      <ColorlibStepIconRoot ownerState={{ active }} onClick={onClick}>
        {active ? <StopIcon /> : <PlayArrowIcon />}
      </ColorlibStepIconRoot>
    </Box>
  );
}

const StepState = ({ running }: { running: boolean }) => {
  return (
    <Chip
      sx={{
        marginLeft: 1,
        fontWeight: 600
      }}
      label={running ? "Running" : "Stopped"}
      color={running ? "success" : "error"}
    />
  );
};

const CustomStep = ({ title, description }: { title: DashboardEntry, description: string }) => {
  const startChannel = `${title}-start`;
  const stopChannel = `${title}-stop`;

  const { state, clearLogs, setIsStarted, setExpanded, ipcRenderer } = useDashboardContext();
  const { logs, isStarted, expanded } = state[title];
  console.log(logs, isStarted, expanded);
  const handleStart = (): void => {
    console.log("start");
    clearLogs(title);
    ipcRenderer.send(startChannel);
    setIsStarted(title, true);
    setExpanded(title, true);
  };
  const handleStop = (): void => {
    console.log("stop");
    ipcRenderer.send(stopChannel);
    setIsStarted(title, false);
    setExpanded(title, false);
  };

  const handleChange = () => {
    setExpanded(title, !expanded);
  };
  console.log(expanded);
  return (
    <Step expanded={true} key={title} active={isStarted}>
      <StyledStepLabel
        icon={<ColorlibStepIcon active={isStarted}
                                onClick={isStarted ? handleStop : handleStart} />}
        optional={
          <Box>
            <Button onClick={handleChange} sx={{
              fontWeight: 600,
              letterSpacing: 1
            }}> {expanded ? "Hide" : "Show"} Logs </Button>
            <StepState running={isStarted} />
          </Box>
        }
      >
        {title}
        <Typography sx={{
          display: "block",
        }}>{description}</Typography>
      </StyledStepLabel>
      <Collapse in={expanded}>
        <StyledStepContent>
          <LogsContainer>
            <LogsTypography>{logs}</LogsTypography>
          </LogsContainer>
        </StyledStepContent>
      </Collapse>
    </Step>
  );
};

export default function Processes() {
  return (
    <Box>
      <Stepper orientation="vertical" connector={<></>}>
        {steps.map((step) => (
          <CustomStep title={step.label} description={step.description} />
        ))}
      </Stepper>
    </Box>
  );
}
