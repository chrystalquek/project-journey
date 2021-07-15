import { AppBar, Divider, Toolbar } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { reset } from "@redux/reducers/loading";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { useIsMobile } from "@utils/helpers/layout";
import React from "react";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: theme.spacing(8),
      [theme.breakpoints.down("sm")]: {
        paddingBottom: 0,
      },
    },
  })
);

function NavBar() {
  const classes = useStyles();
  const isMobile = useIsMobile();

  const userData = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  dispatch(reset());

  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" color="transparent">
        <Toolbar>
          {isMobile ? (
            <MobileNavBar userData={userData} />
          ) : (
            <DesktopNavBar userData={userData} />
          )}
        </Toolbar>
      </AppBar>
      <Divider />
    </div>
  );
}

export default NavBar;
