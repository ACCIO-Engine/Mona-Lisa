import { Box } from "@mui/material";
import { HomeContainer, LogoContainer } from "./Home.styled";
import NameOnlyLogo from "../../assets/name-only-logo.svg?react";
import SearchControls from "../../layouts/Home/SearchControls/SearchControls";

export default function Home() {
  return (
    <Box>
      <HomeContainer>
        <LogoContainer>
          <NameOnlyLogo height={200} />
        </LogoContainer>
        <SearchControls />
      </HomeContainer>
    </Box>
  );
}
