import { useTheme } from "@mui/material";
import { MagnifyingGlass } from "react-loader-spinner";
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