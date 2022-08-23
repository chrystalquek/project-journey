import {
  Avatar,
  ClickAwayListener,
  Fade,
  Grid,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import { logout } from "@redux/reducers/session";
import { useAppDispatch } from "@redux/store";
import { VolunteerData, VolunteerType } from "@type/volunteer";
import {
  EVENTS_ROUTE,
  EVENT_PENDING_REQUESTS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  MY_PAST_EVENTS_ROUTE,
  MY_UPCOMING_EVENTS_ROUTE,
  PAST_EVENTS_ROUTE,
  SIGNUP_ROUTE,
  VOLUNTEER_PENDING_REQUESTS_ROUTE,
  VOLUNTEER_PROFILES_ROUTE,
} from "@utils/constants/routes";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.grey[400],
      borderBottomWidth: "thin",
      marginBottom: theme.spacing(5),
      padding: theme.spacing(2),
    },
    popper: {
      zIndex: 10000,
    },
    button: {
      textTransform: "none",
      fontSize: theme.typography.h2.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
    },
    buttonRight: {
      textTransform: "none",
      fontSize: theme.typography.h2.fontSize,
      fontWeight: "bold",
    },
    editProfileText: {
      fontWeight: "bold",
    },
    iconSize24: {
      fontSize: "24px",
    },
    iconSize40: {
      fontSize: "40px",
    },
  })
);

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
  let eventMenuArray;

  if (!userData) {
    eventMenuArray = [{ title: "Upcoming Events", route: EVENTS_ROUTE }];
  } else if (userData.volunteerType === VolunteerType.ADMIN) {
    eventMenuArray = [
      { title: "Browse Events", route: EVENTS_ROUTE },
      { title: "Past Events", route: PAST_EVENTS_ROUTE },
      { title: "Pending Requests", route: EVENT_PENDING_REQUESTS_ROUTE },
    ];
  } else {
    // Adhoc / Committed
    eventMenuArray = [
      { title: "Browse Events", route: EVENTS_ROUTE },
      { title: "My Upcoming Events", route: MY_UPCOMING_EVENTS_ROUTE },
      { title: "My Past Events", route: MY_PAST_EVENTS_ROUTE },
    ];
  }

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
    dispatch(logout());
    router.push("/login");
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
      <Popper
        open={openEventMenu}
        anchorEl={eventRef.current}
        transition
        className={classes.popper}
      >
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
          className={classes.popper}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={400}>
              <Paper>
                <ClickAwayListener onClickAway={handleCloseVolunteerMenu}>
                  <MenuList>
                    {/* Requires changes for the router */}
                    <MenuItem
                      onClick={() =>
                        closeMenuNavigateTo(
                          handleCloseVolunteerMenu,
                          VOLUNTEER_PROFILES_ROUTE
                        )
                      }
                    >
                      Volunteers List
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        closeMenuNavigateTo(
                          handleCloseVolunteerMenu,
                          VOLUNTEER_PENDING_REQUESTS_ROUTE
                        )
                      }
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
      <Grid container spacing={6}>
        <Grid item>{homeButton}</Grid>
        <Grid item>{eventButton}</Grid>
        {eventMenuWrapper}
        <Grid item>
          {userData &&
            userData.volunteerType === VolunteerType.ADMIN &&
            volunteer}
        </Grid>
      </Grid>
    );
  };

  const loggedInRender = () => {
    if (!userData) {
      return (
        <Grid container alignItems="center">
          <Grid item>
            <Button
              className={classes.buttonRight}
              onClick={() => {
                router.push(LOGIN_ROUTE);
              }}
            >
              <ExitToAppIcon className={classes.iconSize24} color="primary" />
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.buttonRight}
              onClick={() => {
                router.push(SIGNUP_ROUTE);
              }}
            >
              <PersonIcon className={classes.iconSize24} color="primary" />
              Sign Up
            </Button>
          </Grid>
        </Grid>
      );
    }
    const profilePicture = !userData?.photoUrl ? (
      <AccountCircleIcon className={classes.iconSize40} color="primary" />
    ) : (
      <Avatar alt={userData?.name} src={userData?.photoUrl} />
    );

    return (
      <Grid container alignItems="center">
        <Grid item>
          <IconButton edge="start" onClick={toggleLogoutMenu} ref={logoutRef}>
            {profilePicture}
            <Popper
              open={openLogout}
              anchorEl={logoutRef.current}
              transition
              className={classes.popper}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={400}>
                  <Paper>
                    <ClickAwayListener onClickAway={closeLogoutMenu}>
                      <MenuList>
                        <MenuItem dense onClick={handleLogout}>
                          Logout
                        </MenuItem>
                        <MenuItem
                          dense
                          onClick={() =>
                            router.push(`/profile/${userData._id}`)
                          }
                        >
                          Edit Profile
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </IconButton>
        </Grid>
        <Grid item>
          <Typography style={{ fontWeight: "bold" }}>
            {userData?.name}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Grid item container md={9} alignItems="center" spacing={6}>
        <Grid item>
          <Image src="/blessings-in-a-bag.png" width={100} height={100} />
        </Grid>
        <Grid item>{navigationRender()}</Grid>
      </Grid>
      <Grid item>{loggedInRender()}</Grid>
    </Grid>
  );
}
