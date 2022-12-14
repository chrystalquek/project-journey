import {
  Avatar,
  ClickAwayListener,
  Collapse,
  Drawer,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
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
    headerContainer: {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    drawerContainer: {
      minWidth: "200px",
      width: "30%",
    },
    drawerFrame: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    iconSize: {
      fontSize: "40px",
    },
    imageContainer: {
      flex: 1,
      textAlign: "center",
    },
    listButton: {
      textTransform: "none",
      fontSize: theme.typography.h2.fontSize,
      fontWeight: "bold",
    },
    nested: {
      paddingLeft: theme.spacing(6),
    },
    drawerWhitespace: {
      flex: 1,
    },
    primaryTextStyle: {
      color: theme.palette.common.black,
      textTransform: "none",
      fontSize: theme.typography.h2.fontSize,
      fontWeight: "bold",
    },
  })
);

type NavBarProps = {
  userData: null | VolunteerData;
};

export default function MobileNavBar({ userData }: NavBarProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const [drawer, setDrawer] = useState<boolean>(false);
  const [openEventMenu, setOpenEventMenu] = useState<boolean>(false);
  const [openVolunteerMenu, setOpenVolunteerMenu] = useState<boolean>(false);
  const [openLogout, setOpenLogout] = useState<boolean>(false);

  const logoutRef = useRef<HTMLButtonElement>(null);

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
    dispatch(logout());
    router.push("/login");
  };

  const handleCloseAll = () => {
    setOpenEventMenu(false);
    setOpenVolunteerMenu(false);
    setDrawer(false);
  };

  const closeMenuNavigateTo = (closeHandler, route) => {
    closeHandler();
    router.push(route);
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
              onClick={() =>
                closeMenuNavigateTo(handleCloseAll, VOLUNTEER_PROFILES_ROUTE)
              }
            >
              <ListItemText primary="Volunteers List" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() =>
                closeMenuNavigateTo(
                  handleCloseAll,
                  VOLUNTEER_PENDING_REQUESTS_ROUTE
                )
              }
            >
              <ListItemText primary="Pending Approvals" />
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
            onClick={() => closeMenuNavigateTo(handleCloseAll, HOME_ROUTE)}
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
              {eventMenuArray.map(({ title, route }) => (
                <ListItem
                  button
                  className={classes.nested}
                  key={title}
                  onClick={() => closeMenuNavigateTo(handleCloseAll, route)}
                >
                  <ListItemText primary={title} />
                </ListItem>
              ))}
            </List>
          </Collapse>
          {userData &&
            userData.volunteerType === VolunteerType.ADMIN &&
            volunteerMenu}
        </List>
        <div className={classes.drawerWhitespace} />
        {!userData && (
          <List>
            <ListItem
              button
              className={classes.listButton}
              onClick={() => router.push(LOGIN_ROUTE)}
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
              onClick={() => router.push(SIGNUP_ROUTE)}
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
                    <MenuItem
                      dense
                      onClick={() => router.push(`/profile/${userData._id}`)}
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
