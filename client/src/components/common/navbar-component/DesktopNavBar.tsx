import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  Avatar,
  Box,
  ClickAwayListener,
  Paper,
  Popper,
  MenuItem,
  Fade,
  MenuList,
  IconButton,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import { VolunteerData, VolunteerType } from '@type/volunteer';
import { useAppDispatch } from '@redux/store';
import { resetUser } from '@redux/reducers/user';
import {
  EVENTS_ROUTE,
  PAST_EVENTS_ROUTE,
  UPCOMING_EVENTS_ROUTE,
  EVENT_PENDING_REQUESTS_ROUTE,
  VOLUNTEER_PROFILES_ROUTE,
  VOLUNTEER_PENDING_REQUESTS_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  HOME_ROUTE,
} from '@utils/constants/routes';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  buttonsContainer: {
    flexGrow: 1,
    marginLeft: theme.spacing(4),
  },
  button: {
    textTransform: 'none',
    marginLeft: theme.spacing(2),
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
  },
  buttonRight: {
    textTransform: 'none',
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(2),
  },
  nameStyle: {
    color: '#000000',
    flex: 1,
  },
  loginButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
  },
  signUpButtonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  editProfileButton: {
    margin: 0,
    padding: 0,
    textAlign: 'left',
  },
  editProfileText: {
    flex: 1,
    fontWeight: 'bold',
  },
  iconSize24: {
    fontSize: '24px',
  },
  iconSize40: {
    fontSize: '40px',
  },
}));

type NavBarProps = {
  userData: null | VolunteerData;
};

export default function DesktopNavBar({ userData }: NavBarProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const eventRef = useRef<HTMLButtonElement>(null);
  const volunteerRef = useRef<HTMLButtonElement>(null);
  const logoutRef = useRef<HTMLButtonElement>(null);

  const [openEventMenu, setOpenEventMenu] = useState<boolean>(false);
  const [openVolunteerMenu, setOpenVolunteerMenu] = useState<boolean>(false);
  const [openLogout, setOpenLogout] = useState<boolean>(false);

  /**
   * Navigation for Event menu.
   */
  const eventMenuArray = !userData
    ? [{ title: 'Upcoming Events', route: EVENTS_ROUTE }]
    : userData.volunteerType === VolunteerType.ADMIN
      ? [
        { title: 'Browse Events', route: EVENTS_ROUTE },
        { title: 'Past Events', route: PAST_EVENTS_ROUTE },
        { title: 'Pending Requests', route: EVENT_PENDING_REQUESTS_ROUTE },
      ]
      : [
        // Adhoc / Committed
        { title: 'Browse Events', route: EVENTS_ROUTE },
        { title: 'My Upcoming Events', route: UPCOMING_EVENTS_ROUTE },
        { title: 'My Past Events', route: PAST_EVENTS_ROUTE },
      ];

  const toggleEventMenu = () => {
    setOpenEventMenu((prevOpen) => !prevOpen);
  };

  const toggleVolunteerMenu = () => {
    setOpenVolunteerMenu((prevOpen) => !prevOpen);
  };

  const handleCloseEventMenu = () => {
    setOpenEventMenu(false);
  };

  const handleCloseVolunteerMenu = () => {
    setOpenVolunteerMenu(false);
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

  const closeMenuNavigateTo = (closeHandler, route) => {
    closeHandler();
    router.push(route);
  };

  const navigationRender = () => {
    const homeButton = (
      <Button
        className={classes.button}
        onClick={() => router.push(HOME_ROUTE)}
      >
        Home
      </Button>
    );

    const eventButton = (
      <Button
        ref={eventRef}
        onClick={toggleEventMenu}
        className={classes.button}
      >
        Events
      </Button>
    );

    const eventMenuWrapper = (
      <Popper open={openEventMenu} anchorEl={eventRef.current} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={400}>
            <Paper>
              <ClickAwayListener onClickAway={handleCloseEventMenu}>
                <MenuList>
                  {eventMenuArray.map(({ title, route }) => (
                    <MenuItem
                      key={title}
                      onClick={() => {
                        closeMenuNavigateTo(handleCloseEventMenu, route);
                      }}
                    >
                      {title}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    );

    const volunteer = (
      <>
        <Button
          ref={volunteerRef}
          onClick={toggleVolunteerMenu}
          className={classes.button}
        >
          Volunteer
        </Button>
        <Popper
          open={openVolunteerMenu}
          anchorEl={volunteerRef.current}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={400}>
              <Paper>
                <ClickAwayListener onClickAway={handleCloseVolunteerMenu}>
                  <MenuList>
                    {/* Requires changes for the router */}
                    <MenuItem
                      onClick={() => closeMenuNavigateTo(
                        handleCloseVolunteerMenu,
                        VOLUNTEER_PROFILES_ROUTE,
                      )}
                    >
                      Volunteers List
                    </MenuItem>
                    <MenuItem
                      onClick={() => closeMenuNavigateTo(
                        handleCloseVolunteerMenu,
                        VOLUNTEER_PENDING_REQUESTS_ROUTE,
                      )}
                    >
                      Pending Approvals
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
      </>
    );

    return (
      <>
        {homeButton}
        {eventButton}
        {eventMenuWrapper}
        {userData
          && userData.volunteerType === VolunteerType.ADMIN
          && volunteer}
      </>
    );
  };

  const loggedInRender = () => {
    if (!userData) {
      return (
        <>
          <div className={classes.loginButtonContainer}>
            <ExitToAppIcon className={classes.iconSize24} color="primary" />
            <Button
              className={classes.buttonRight}
              onClick={() => {
                router.push(LOGIN_ROUTE);
              }}
            >
              Login
            </Button>
          </div>
          <div className={classes.signUpButtonContainer}>
            <PersonIcon className={classes.iconSize24} color="primary" />
            <Button
              className={classes.buttonRight}
              onClick={() => {
                router.push(SIGNUP_ROUTE);
              }}
            >
              Sign Up
            </Button>
          </div>
        </>
      );
    }
    const profilePicture = !userData?.photoUrl ? (
      <AccountCircleIcon className={classes.iconSize40} color="primary" />
    ) : (
      <Avatar alt={userData?.name} src={userData?.photoUrl} />
    );

    return (
      <>
        <IconButton edge="start" onClick={toggleLogoutMenu} ref={logoutRef}>
          {profilePicture}
          <Popper open={openLogout} anchorEl={logoutRef.current} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={400}>
                <Paper>
                  <ClickAwayListener onClickAway={closeLogoutMenu}>
                    <MenuList>
                      <MenuItem dense onClick={handleLogout}>
                        Logout
                      </MenuItem>
                      <MenuItem dense onClick={() => router.push(`/profile/${userData._id}`)}>
                        Edit Profile
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Fade>
            )}
          </Popper>
        </IconButton>
        <div className={classes.nameContainer}>
          <Typography className={classes.nameStyle}>
            <Box fontWeight={700}>{userData?.name}</Box>
          </Typography>
        </div>
      </>
    );
  };

  return (
    <>
      <Image src="/blessings-in-a-bag.png" width={100} height={100} />
      <div className={classes.buttonsContainer}>{navigationRender()}</div>
      {loggedInRender()}
    </>
  );
}
