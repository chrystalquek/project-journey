import React from 'react';
import {
  AppBar,
  Divider,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { StoreState, useAppDispatch, useAppSelector } from '@redux/store';
import { reset } from '@redux/reducers/loading';
import DesktopNavBar from './DesktopNavBar';
import MobileNavBar from './MobileNavBar';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 0,
    },
  },
}));

function NavBar() {
  const classes = useStyles();
  const theme = useTheme();
  const userData = useAppSelector((state) => state.user.user);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  dispatch(reset());

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
