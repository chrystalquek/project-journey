import { VOLUNTEER_PROFILES_ROUTE } from "@constants/routes";
import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { useAppSelector } from "@redux/store";
import { VolunteerType } from "@type/volunteer";
import React from "react";

type Props = {
  selected: "details" | "volunteers" | "feedback";
};

const useStyles = makeStyles((theme) => ({
  selected: {
    borderLeft: "1px solid",
    borderColor: theme.palette.secondary.main,
  },
}));

function SideNav({ selected }: Props) {
  const classes = useStyles();
  const currentUser = useAppSelector((state) => state.user.user);
  const isAdmin = currentUser?.volunteerType === VolunteerType.ADMIN;

  return (
    <List>
      <ListItem
        button
        dense
        className={selected === "details" && classes.selected}
        component="a"
        href="#"
      >
        <ListItemText primary="Details" />
      </ListItem>

      {isAdmin && (
        <ListItem
          button
          dense
          className={selected === "volunteers" && classes.selected}
          component="a"
          href={VOLUNTEER_PROFILES_ROUTE}
        >
          <ListItemText primary="Volunteers" />
        </ListItem>
      )}

      <ListItem
        button
        dense
        className={selected === "feedback" && classes.selected}
        component="a"
        href="#"
      >
        <ListItemText primary="Feedback" />
      </ListItem>
    </List>
  );
}

export default SideNav;
