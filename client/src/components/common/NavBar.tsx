import React from 'react';
import {
  AppBar, Divider, Toolbar, useMediaQuery, useTheme,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { VolunteerData } from 'types/volunteer';
import DesktopNavBar from './navbar-component/DesktopNavBar';
import MobileNavBar from './navbar-component/MobileNavBar';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    paddingBottom: 40,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 0,
    },
  },
}));

type NavBarProps = {
  userData: null | VolunteerData;
};

function NavBar({ userData }: NavBarProps) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" color="transparent">
        <Toolbar>
          {isSmallScreen ? (
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
