import { Box, Typography, useTheme } from "@mui/material";
import { HomeContainer, LogoContainer } from "./Home.styled";
import LightNameOnlyLogo from "../../assets/name-only-logo.svg?react";
import DarkNameOnlyLogo from "../../assets/name-only-logo-dark.svg?react";
import SearchControls from "../../layouts/Home/SearchControls/SearchControls";
import { SLOGAN } from "../../Constants.ts";

export default function Home() {
  const theme = useTheme();
  return (
    <Box>
      <HomeContainer>
        <LogoContainer>
          {/*<NameOnlyLogo height={200} />*/}

          {theme.palette.mode === "dark" ? (
            <DarkNameOnlyLogo height={200} />
          ) : (
            <LightNameOnlyLogo height={200} />
          )}
          <Typography variant="h6" component="h1">
            {SLOGAN}
          </Typography>
        </LogoContainer>
        <SearchControls />
      </HomeContainer>
    </Box>
  );
}
