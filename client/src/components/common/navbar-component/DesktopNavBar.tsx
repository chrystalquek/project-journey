import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  Avatar,
  Box,
  ClickAwayListener,
  Paper,
  Popper,
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
    buttonsContainer: {
      flexGrow: 1,
      marginLeft: theme.spacing(4),
    },
    button: {
      textTransform: "none",
      marginLeft: theme.spacing(2),
      fontSize: theme.typography.h4.fontSize,
      fontWeight: "bold",
    },
    buttonRight: {
      textTransform: "none",
      fontSize: theme.typography.h4.fontSize,
      fontWeight: "bold",
    },
    nameContainer: {
      display: "flex",
      flexDirection: "column",
      marginLeft: theme.spacing(2),
    },
    nameStyle: {
      color: "#000000",
      flex: 1,
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
    editProfileButton: {
      margin: 0,
      padding: 0,
      textAlign: "left",
    },
    editProfileText: {
      flex: 1,
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
  const router = useRouter();

  const eventRef = useRef<HTMLButtonElement>(null);
  const volunteerRef = useRef<HTMLButtonElement>(null);

  const [openEventMenu, setOpenEventMenu] = useState<boolean>(false);
  const [openVolunteerMenu, setOpenVolunteerMenu] = useState<boolean>(false);

  const eventMenuArray = !userData
    ? ["Upcoming Events"]
    : userData.volunteerType.toLowerCase() === "admin"
    ? ["Browse Events", "Past Events"]
    : ["Browse Events", "My Upcoming Events", "My Past Events"];

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
    const homeButton = (
      <Button className={classes.button} onClick={() => router.push("/")}>
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
                  {eventMenuArray.map((menuName, index) => (
                    <MenuItem key={index} onClick={() => router.push("/admin")}>
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
                        router.push("/volunteer");
                      }}
                    >
                      Volunteer Profiles
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        router.push("/volunteer");
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
        {userData &&
          userData.volunteerType.toLowerCase() === "admin" &&
          volunteer}
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
                router.push("/login");
              }}
            >
              Login
            </Button>
          </div>
          <div className={classes.signupButtonContainer}>
            <PersonIcon className={classes.iconSize24} color="primary" />
            <Button
              className={classes.buttonRight}
              onClick={() => {
                router.push("/signup");
              }}
            >
              Sign Up
            </Button>
          </div>
        </>
      );
    } else {
      const profilePicture =
        userData.photoUrl === undefined ? (
          <>
            <AccountCircleIcon classes={classes.iconSize40} color="primary" />
          </>
        ) : (
          <Avatar alt={userData.name} src={userData.photoUrl} />
        );

      return (
        <>
          {profilePicture}
          <div className={classes.nameContainer}>
            <Typography className={classes.nameStyle}>
              <Box fontWeight={700}>{userData.name}</Box>
            </Typography>
            <Button
              className={`${classes.button} ${classes.editProfileButton}`}
              disableRipple
            >
              <Typography className={classes.editProfileText}>
                Edit Profile
              </Typography>
            </Button>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Image src="/blessings-in-a-bag.png" width={100} height={100}></Image>
      <div className={classes.buttonsContainer}>{navigationRender()}</div>
      {loggedInRender()}
    </>
  );
}
