import { useTheme } from "@mui/material";
import { Hourglass, MagnifyingGlass } from "react-loader-spinner";
import { alpha } from "@mui/system";

export const MagnifyingGlassLoader = () => {
  const theme = useTheme();
  return (
    <>
      <MagnifyingGlass
        visible={true}
        height="40%"
        width="40%"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor={`${alpha(theme.palette.primary.light, 0.5)}`}
        color={`${alpha(theme.palette.primary.main, 0.8)}`}
      />
    </>
  );
};

export const HourGlassLoader = () => {
  const theme = useTheme();
  return (
    <>
      <Hourglass
        visible={true}
        height="50%"
        width="50%"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        colors={[
          `${alpha(theme.palette.primary.light, 0.7)}`,
          `${alpha(theme.palette.primary.main, 1)}`
        ]}
      />
    </>
  );
};