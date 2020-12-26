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
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonIcon from "@material-ui/icons/Person";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
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
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

type NavBarProps = {
  userData: null | VolunteerData;
};

export default function NavBar({ userData }: NavBarProps) {
  const classes = useStyles();

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const eventRef = useRef<HTMLButtonElement>(null);
  const volunteerRef = useRef<HTMLButtonElement>(null);

  const [openEventMenu, setOpenEventMenu] = useState<boolean>(false);
  const [openVolunteerMenu, setOpenVolunteerMenu] = useState<boolean>(false);

  const eventMenuArray = !userData
    ? ["Upcoming Events"]
    : userData.volunteerType === "Admin"
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
        {userData && userData.volunteerType === "Admin" && volunteerJSX}
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

  const renderWebVersion = () => (
    <>
      <Image src="/blessings-in-a-bag.png" width={100} height={100}></Image>
      <div className={classes.buttons}>{navigationRender()}</div>
      {loggedInRender()}
    </>
  );

  // ******************************* Mobile version starts here *******************************
  const [drawer, setDrawer] = useState<boolean>(false);
  const [openEventMenuMobile, setOpenEventMenuMobile] = useState<boolean>(
    false
  );
  const [
    openVolunteerMenuMobile,
    setOpenVolunteerMenuMobile,
  ] = useState<boolean>(false);

  const openDrawer = () => {
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  const toggleEventMobileMenu = () => {
    setOpenEventMenuMobile((prevOpen) => !prevOpen);
  };

  const toggleVolunteerMobileMenu = () => {
    setOpenVolunteerMenuMobile((prevOpen) => !prevOpen);
  };

  const navigationMobileRender = () => {
    const volunteerMenu = (
      <>
        <ListItem button onClick={toggleVolunteerMobileMenu}>
          <ListItemText primary="Volunteer" />
          {openVolunteerMenuMobile ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openVolunteerMenuMobile} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Volunteer Profiles" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Pending Approvals" />
            </ListItem>
          </List>
        </Collapse>
      </>
    );

    return (
      <div
        style={{
          width: "200px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List>
          <ListItem>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={toggleEventMobileMenu}>
            <ListItemText primary="Event" />
            {openEventMenuMobile ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openEventMenuMobile} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {eventMenuArray.map((eventMenu, index) => (
                <ListItem button className={classes.nested} key={index}>
                  <ListItemText primary={eventMenu} />
                </ListItem>
              ))}
            </List>
          </Collapse>
          {userData && userData.volunteerType === "Admin" && volunteerMenu}
        </List>
        <div style={{ flex: 1 }} />
        {!userData && (
          <List>
            <ListItem>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItem>
          </List>
        )}
      </div>
    );
  };

  const loggedInMobileRender = () => {
    if (!userData || !userData.photoUrl) {
      return <AccountCircleIcon style={{ fontSize: "41px" }} color="primary" />;
    } else {
      return <Avatar alt={userData.name} src={userData.photoUrl} />;
    }
  };

  const renderMobileVersion = () => (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <IconButton edge="start" onClick={openDrawer}>
        <MenuIcon style={{ fontSize: "40px" }} />
      </IconButton>
      <Drawer anchor="left" open={drawer} onClose={closeDrawer}>
        {navigationMobileRender()}
      </Drawer>
      <div style={{ flex: 1, textAlign: "center" }}>
        <Image src="/blessings-in-a-bag.png" width={75} height={75}></Image>
      </div>
      {loggedInMobileRender()}
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          {isSmallScreen ? renderMobileVersion() : renderWebVersion()}
        </Toolbar>
      </AppBar>
    </div>
  );
}
