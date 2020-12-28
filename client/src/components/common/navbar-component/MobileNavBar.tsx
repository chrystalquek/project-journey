import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Avatar,
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
      fontSize: theme.typography.h4.fontSize,
      fontWeight: "bold",
    },
    nested: {
      paddingLeft: theme.spacing(6),
    },
    drawerWhitespace: {
      flex: 1,
    },
  })
);

type NavBarProps = {
  userData: null | VolunteerData;
};

export default function MobileNavBar({ userData }: NavBarProps) {
  const router = useRouter();
  const classes = useStyles();
  const [drawer, setDrawer] = useState<boolean>(false);
  const [openEventMenu, setOpenEventMenu] = useState<boolean>(false);
  const [openVolunteerMenu, setOpenVolunteerMenu] = useState<boolean>(false);

  const eventMenuArray = !userData
    ? ["Upcoming Events"]
    : userData.volunteerType.toLowerCase() === "admin"
    ? ["Browse Events", "Past Events"]
    : ["Browse Events", "My Upcoming Events", "My Past Events"];

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

  const navigationRender = () => {
    const volunteerMenu = (
      <>
        <ListItem
          button
          className={classes.listButton}
          onClick={toggleVolunteerMenu}
        >
          <ListItemText disableTypography primary="Volunteer" />
          {openVolunteerMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openVolunteerMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Requires changes for the router */}
            <ListItem
              button
              className={classes.nested}
              onClick={() => router.push("/volunteer")}
            >
              <ListItemText primary="Volunteer Profiles" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => router.push("/volunteer")}
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
            onClick={() => router.push("/")}
          >
            <ListItemText disableTypography primary="Home" />
          </ListItem>
          <ListItem
            button
            className={classes.listButton}
            onClick={toggleEventMenu}
          >
            <ListItemText disableTypography primary="Event" />
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
                  onClick={() => router.push("/admin/events")}
                >
                  <ListItemText primary={eventMenu} />
                </ListItem>
              ))}
            </List>
          </Collapse>
          {userData &&
            userData.volunteerType.toLowerCase() === "admin" &&
            volunteerMenu}
        </List>
        <div className={classes.drawerWhitespace} />
        {!userData && (
          <List>
            <ListItem
              button
              className={classes.listButton}
              onClick={() => router.push("/login")}
            >
              <ListItemIcon>
                <ExitToAppIcon color="primary" />
              </ListItemIcon>
              <ListItemText disableTypography primary="Login" />
            </ListItem>
            <ListItem
              button
              className={classes.listButton}
              onClick={() => router.push("/signup")}
            >
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText disableTypography primary="Sign Up" />
            </ListItem>
          </List>
        )}
      </div>
    );
  };

  const loggedInRender = () => {
    if (!userData || !userData.photoUrl) {
      return <AccountCircleIcon className={classes.iconSize} color="primary" />;
    } else {
      return <Avatar alt={userData.name} src={userData.photoUrl} />;
    }
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
        <Image src="/blessings-in-a-bag.png" width={75} height={75}></Image>
      </div>
      {loggedInRender()}
    </div>
  );
}
