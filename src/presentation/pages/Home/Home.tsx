import { Box, useTheme } from "@mui/material";
import { HomeContainer, LogoContainer } from "./Home.styled";
import NameOnlyLogo from "../../assets/name-only-logo.svg?react";
import LightNameOnlyLogo from "../../assets/light-name-only-logo.svg?react";
import SearchControls from "../../layouts/Home/SearchControls/SearchControls";

export default function Home() {
  const theme = useTheme();
  return (
    <Box>
      <HomeContainer>
        <LogoContainer>
          {theme.palette.mode === "dark" ? (
            <LightNameOnlyLogo height={200} />
          ) : (
            <NameOnlyLogo height={200} />
          )}
        </LogoContainer>
        <SearchControls />
      </HomeContainer>
    </Box>
  );
}
