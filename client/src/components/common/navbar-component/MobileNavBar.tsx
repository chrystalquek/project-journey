import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Popper,
  Fade,
  ClickAwayListener,
  Paper,
  MenuList,
  MenuItem,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { VolunteerData, VOLUNTEER_TYPE } from 'types/volunteer';
import { useDispatch } from 'react-redux';
import { resetUser } from '@redux/reducers/user';
import { EVENTS_ROUTE } from '@constants/routes';

const useStyles = makeStyles((theme: Theme) => createStyles({
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  drawerContainer: {
    minWidth: '200px',
    width: '30%',
  },
  drawerFrame: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  iconSize: {
    fontSize: '40px',
  },
  imageContainer: {
    flex: 1,
    textAlign: 'center',
  },
  listButton: {
    textTransform: 'none',
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
  drawerWhitespace: {
    flex: 1,
  },
  primaryTextStyle: {
    color: '#000', // black
    textTransform: 'none',
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
  },
}));

type NavBarProps = {
  userData: null | VolunteerData;
};

export default function MobileNavBar({ userData }: NavBarProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [drawer, setDrawer] = useState<boolean>(false);
  const [openEventMenu, setOpenEventMenu] = useState<boolean>(false);
  const [openVolunteerMenu, setOpenVolunteerMenu] = useState<boolean>(false);
  const [openLogout, setOpenLogout] = useState<boolean>(false);

  const logoutRef = useRef<HTMLButtonElement>(null);

  const eventMenuArray = !userData
    ? ['Upcoming Events']
    : userData.volunteerType === VOLUNTEER_TYPE.ADMIN
      ? ['Browse Events', 'Past Events']
      : ['Browse Events', 'My Upcoming Events', 'My Past Events'];

  const openDrawer = () => {
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  const toggleEventMenu = () => {
    setOpenEventMenu((prevOpen) => !prevOpen);
  };

  const toggleVolunteerMenu = () => {
    setOpenVolunteerMenu((prevOpen) => !prevOpen);
  };

  const toggleLogoutMenu = () => {
    setOpenLogout((prevOpen) => !prevOpen);
  };

  const closeLogoutMenu = () => {
    setOpenLogout(false);
  };

  const handleLogout = () => {
    dispatch(resetUser());
    router.push('/login');
  };

  const navigationRender = () => {
    const volunteerMenu = (
      <>
        <ListItem
          button
          className={classes.listButton}
          onClick={toggleVolunteerMenu}
        >
          <ListItemText
            primary="Volunteer"
            primaryTypographyProps={{ className: classes.primaryTextStyle }}
          />
          {openVolunteerMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openVolunteerMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => router.push('/volunteer/volunteer-profiles')}
            >
              <ListItemText primary="Volunteer Profiles" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => router.push('/volunteer/pending-requests')}
            >
              <ListItemText primary="Pending Requests" />
            </ListItem>
          </List>
        </Collapse>
      </>
    );

    return (
      <div className={classes.drawerFrame}>
        <List>
          <ListItem
            button
            className={classes.listButton}
            onClick={() => router.push('/')}
          >
            <ListItemText
              primary="Home"
              primaryTypographyProps={{ className: classes.primaryTextStyle }}
            />
          </ListItem>
          <ListItem
            button
            className={classes.listButton}
            onClick={toggleEventMenu}
          >
            <ListItemText
              primary="Events"
              primaryTypographyProps={{ className: classes.primaryTextStyle }}
            />
            {openEventMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openEventMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Requires changes for the router */}
              {eventMenuArray.map((eventMenu, index) => (
                <ListItem
                  button
                  className={classes.nested}
                  key={index}
                  onClick={() => router.push(EVENTS_ROUTE)}
                >
                  <ListItemText primary={eventMenu} />
                </ListItem>
              ))}
              {userData?.volunteerType === VOLUNTEER_TYPE.ADMIN && (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => router.push('/event/pending-requests')}
                >
                  <ListItemText primary="Pending Requests" />
                </ListItem>
              )}
            </List>
          </Collapse>
          {userData
            && userData.volunteerType === VOLUNTEER_TYPE.ADMIN
            && volunteerMenu}
        </List>
        <div className={classes.drawerWhitespace} />
        {!userData && (
          <List>
            <ListItem
              button
              className={classes.listButton}
              onClick={() => router.push('/login')}
            >
              <ListItemIcon>
                <ExitToAppIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Login"
                primaryTypographyProps={{ className: classes.primaryTextStyle }}
              />
            </ListItem>
            <ListItem
              button
              className={classes.listButton}
              onClick={() => router.push('/signup')}
            >
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Sign Up"
                primaryTypographyProps={{ className: classes.primaryTextStyle }}
              />
            </ListItem>
          </List>
        )}
      </div>
    );
  };

  const loggedInRender = () => {
    if (!userData) {
      return <AccountCircleIcon className={classes.iconSize} color="primary" />;
    }

    const profileIcon = !userData.photoUrl ? (
      <AccountCircleIcon className={classes.iconSize} color="primary" />
    ) : (
        <Avatar alt={userData.name} src={userData.photoUrl} />
      );

    return (
      <IconButton edge="start" onClick={toggleLogoutMenu} ref={logoutRef}>
        {profileIcon}
        <Popper open={openLogout} anchorEl={logoutRef.current} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={400}>
              <Paper>
                <ClickAwayListener onClickAway={closeLogoutMenu}>
                  <MenuList>
                    <MenuItem dense onClick={handleLogout}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
      </IconButton>
    );
  };

  return (
    <div className={classes.headerContainer}>
      <IconButton edge="start" onClick={openDrawer}>
        <MenuIcon className={classes.iconSize} />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawer}
        onClose={closeDrawer}
        classes={{ paper: classes.drawerContainer }}
      >
        {navigationRender()}
      </Drawer>
      <div className={classes.imageContainer}>
        <Image src="/blessings-in-a-bag.png" width={75} height={75} />
      </div>
      {loggedInRender()}
    </div>
  );
}
