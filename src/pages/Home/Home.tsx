import { Box } from "@mui/material";
import { HomeContainer, FieldContainer, LogoContainer } from "./Home.styled";
import LargeSearch from "../../components/TextFields/LargeSearch";
import NameOnlyLogo from "../../assets/name-only-logo.svg?react";

export default function Home() {
  return (
    <Box>
      <HomeContainer>
        <LogoContainer>
          <NameOnlyLogo height={200} />
        </LogoContainer>
        <FieldContainer>
          <LargeSearch />
        </FieldContainer>
      </HomeContainer>
    </Box>
  );
}
