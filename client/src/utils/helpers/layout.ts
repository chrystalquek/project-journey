import { useMediaQuery, useTheme } from "@material-ui/core";

export const useIsMobile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("xs"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return isMobile && !isDesktop;
};
