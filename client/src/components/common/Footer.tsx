import React, { FC } from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footerStyle: {
    textAlign: "center",
    padding: theme.spacing(6),
    backgroundColor: theme.palette.common.white,
  },
}));

const FooterComponent: FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footerStyle}>
      <Typography>Journey © 2021 Created by DSC NUS</Typography>
    </footer>
  );
};

export default FooterComponent;
