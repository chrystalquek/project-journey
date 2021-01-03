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
import { VolunteerData, VOLUNTEER_TYPE } from 'types/volunteer';
import { useDispatch } from 'react-redux';
import { resetUser } from '@redux/reducers/user';

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
  const dispatch = useDispatch();
  const router = useRouter();

  const eventRef = useRef<HTMLButtonElement>(null);
  const volunteerRef = useRef<HTMLButtonElement>(null);
  const logoutRef = useRef<HTMLButtonElement>(null);

  const [openEventMenu, setOpenEventMenu] = useState<boolean>(false);
  const [openVolunteerMenu, setOpenVolunteerMenu] = useState<boolean>(false);
  const [openLogout, setOpenLogout] = useState<boolean>(false);

  const eventMenuArray = !userData
    ? ['Upcoming Events']
    : userData.volunteerType === VOLUNTEER_TYPE.ADMIN
      ? ['Browse Events', 'Past Events']
      : ['Browse Events', 'My Upcoming Events', 'My Past Events'];

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
  };

  const navigationRender = () => {
    const homeButton = (
      <Button className={classes.button} onClick={() => router.push('/')}>
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
                  {eventMenuArray.map((menuName) => (
                    <MenuItem
                      key={menuName}
                      onClick={() => router.push('/admin/events')}
                    >
                      {menuName}
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
                      onClick={() => {
                        router.push('/volunteer');
                      }}
                    >
                      Volunteer Profiles
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        router.push('/volunteer');
                      }}
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
          && userData.volunteerType === VOLUNTEER_TYPE.ADMIN
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
                router.push('/login');
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
                router.push('/signup');
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
        <Avatar alt={userData.name} src={userData.photoUrl} />
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
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Fade>
            )}
          </Popper>
        </IconButton>
        <div className={classes.nameContainer}>
          <Typography className={classes.nameStyle}>
            <Box fontWeight={700}>{userData.name}</Box>
          </Typography>
          <Button
            className={`${classes.button} ${classes.editProfileButton}`}
            onClick={() => router.push('/volunteer/Profile')}
            disableRipple
          >
            <Typography className={classes.editProfileText}>
              Edit Profile
            </Typography>
          </Button>
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
