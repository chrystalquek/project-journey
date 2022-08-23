import React, { FC } from "react";
import { makeStyles, Box, useTheme } from "@material-ui/core";

type TypographyWithUnderlineProps = {
  fontSize?: "h1" | "h2" | "h3" | "h4" | "body1" | "body2";
  fontWeight?: "fontWeightRegular" | "fontWeightMedium" | "fontWeightBold";
};

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.grey[400],
    borderBottomWidth: "thin",
    marginBottom: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
}));

const TypographyWithUnderline: FC<TypographyWithUnderlineProps> = (props) => {
  const { fontSize, fontWeight, children } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box
      className={classes.root}
      fontWeight={fontWeight ?? "fontWeightRegular"}
      fontSize={theme.typography[fontSize ?? "body1"].fontSize}
    >
      {children}
    </Box>
  );
};

export default TypographyWithUnderline;
