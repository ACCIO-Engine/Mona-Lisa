import { Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { HomeContainer, LogoContainer, SearchControlsContainer } from "./Home.styled";
import LightNameOnlyLogo from "../../assets/name-only-logo.svg?react";
import DarkNameOnlyLogo from "../../assets/name-only-logo-dark.svg?react";
import SearchControls from "../../layouts/Home/SearchControls/SearchControls";
import { SLOGAN } from "../../Constants.ts";
import "./Home.css";
import Results from "../Results/Results.tsx";

export default function Home() {
  const theme = useTheme();
  const [hasResults, setHasResults] = useState(false);
  const searchCallback = () => {
    setHasResults(true);
  };

  const clearResults = () => {
    setHasResults(false);
  };

  return (
    <HomeContainer>
      <CSSTransition
        in={!hasResults}
        timeout={300}
        classNames="logo"
        unmountOnExit
      >
        <LogoContainer>
          {theme.palette.mode === "dark" ? (
            <DarkNameOnlyLogo height={200} />
          ) : (
            <LightNameOnlyLogo height={200} />
          )}
          <Typography variant="h6" component="h1">
            {SLOGAN}
          </Typography>
        </LogoContainer>
      </CSSTransition>
      <SearchControlsContainer
        className={`search-controls-wrapper ${hasResults ? "fixed" : ""}`}>
        <CSSTransition
          in={hasResults}
          timeout={300}
          classNames="search-controls"
        >

          <SearchControls searchCallback={searchCallback} clearResults={clearResults}
                          canClear={hasResults} />
        </CSSTransition>
      </SearchControlsContainer>

      {/*<Button onClick={() => setHasResults(false)}>Back</Button>*/}

      {hasResults && <Results />}
    </HomeContainer>
  );
}
