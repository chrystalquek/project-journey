import React, { useState, useRef } from "react";
import Image from "next/image";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Avatar,
  Box,
  ClickAwayListener,
  Paper,
  Popper,
  useMediaQuery,
  useTheme,
  MenuItem,
  Fade,
  MenuList,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonIcon from "@material-ui/icons/Person";
import { VolunteerData } from "types/volunteer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    buttons: {
      flexGrow: 1,
    },
    nameContainer: {
      display: "flex",
      flexDirection: "column",
      marginLeft: theme.spacing(2),
    },
    loginButtonContainer: {
      display: "flex",
      alignItems: "center",
      marginRight: theme.spacing(2),
    },
    signupButtonContainer: {
      display: "flex",
      alignItems: "center",
    },
    iconSize: {
      fontSize: "24px",
    },
    buttonName: {
      marginLeft: theme.spacing(1),
    },
  })
);

type NavBarProps = {
  userData: null | VolunteerData;
};

export default function NavBar({ userData }: NavBarProps) {
  const classes = useStyles();

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const eventRef = useRef<HTMLButtonElement>(null);
  const volunteerRef = useRef<HTMLButtonElement>(null);

  const [openEventMenu, setOpenEventMenu] = useState<boolean>(false);
  const [openVolunteerMenu, setOpenVolunteerMenu] = useState<boolean>(false);

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

  const navigationRender = () => {
    // Should be volunteerType === 'Admin' ?? Need Clarification
    const homeButtonJSX = (
      <Button>
        <Typography variant="body1">Home</Typography>
      </Button>
    );

    const eventButtonJSX = (
      <Button ref={eventRef} onClick={toggleEventMenu}>
        <Typography variant="body1">Events</Typography>
      </Button>
    );

    const eventMenuArray = !userData
      ? ["Upcoming Events"]
      : userData.volunteerType === "Admin"
      ? ["Browse Events", "Past Events"]
      : ["Browse Events", "My Upcoming Events", "My Past Events"];

    const eventMenuWrapperJSX = (
      <Popper open={openEventMenu} anchorEl={eventRef.current} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={400}>
            <Paper>
              <ClickAwayListener onClickAway={handleCloseEventMenu}>
                <MenuList>
                  {eventMenuArray.map((menuName, index) => (
                    <MenuItem key={index}>{menuName}</MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    );

    const volunteerJSX = (
      <>
        <Button ref={volunteerRef} onClick={toggleVolunteerMenu}>
          <Typography variant="body1">Volunteer</Typography>
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
                    <MenuItem onClick={handleCloseVolunteerMenu}>
                      Volunteer Profiles
                    </MenuItem>
                    <MenuItem onClick={handleCloseVolunteerMenu}>
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
        {homeButtonJSX}
        {eventButtonJSX}
        {eventMenuWrapperJSX}
        {userData.volunteerType === "Admin" && volunteerJSX}
      </>
    );
  };

  const loggedInRender = () => {
    if (!userData) {
      return (
        <>
          <div className={classes.loginButtonContainer}>
            <ExitToAppIcon className={classes.iconSize} color="primary" />
            <Typography
              variant="body1"
              display="inline"
              className={classes.buttonName}
            >
              Login
            </Typography>
          </div>
          <div className={classes.signupButtonContainer}>
            <PersonIcon className={classes.iconSize} color="primary" />
            <Typography
              variant="body1"
              display="inline"
              className={classes.buttonName}
            >
              Sign Up
            </Typography>
          </div>
        </>
      );
    } else {
      const profilePicture =
        userData.photoUrl === undefined ? (
          <>
            <AccountCircleIcon style={{ fontSize: "40px" }} color="primary" />
            <div> G?? </div>
          </>
        ) : (
          <Avatar alt={userData.name} src={userData.photoUrl} />
        );

      return (
        <>
          {profilePicture}
          <div className={classes.nameContainer}>
            <Typography style={{ flex: 1 }}>
              <Box fontWeight={700}>{userData.name}</Box>
            </Typography>
            <Typography style={{ flex: 1 }}>Edit Profile</Typography>
          </div>
        </>
      );
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Image src="/blessings-in-a-bag.png" width={100} height={100}></Image>
          <div className={classes.buttons}>{navigationRender()}</div>
          {loggedInRender()}
        </Toolbar>
      </AppBar>
    </div>
  );
}
