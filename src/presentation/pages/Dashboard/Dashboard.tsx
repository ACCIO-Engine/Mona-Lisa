import React from "react";
import { Box } from "@mui/material";
import Processes from "../../layouts/Dashboard/Processes/Processes.tsx";

const Dashboard: React.FC = () => {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2
    }}>
      <Processes />
      {/*<DashboardAccordion title={DashboardEntry.HEDWIG} />*/}
      {/*<DashboardAccordion title={DashboardEntry.NANO_BERT} />*/}
      {/*<DashboardAccordion title={DashboardEntry.CHROMA_DB} />*/}
      {/*<DashboardAccordion title={DashboardEntry.OCTOPUS} />*/}
    </Box>
  );
};

export default Dashboard;
