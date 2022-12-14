import { EVENT_VOLUNTEERS_ROUTE } from "@constants/routes";
import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { useAppSelector } from "@redux/store";
import { VolunteerType } from "@type/volunteer";
import React from "react";

type Props = {
  selected: "details" | "volunteers" | "feedback";
  eventId: string;
};

const useStyles = makeStyles((theme) => ({
  selected: {
    borderLeft: "1px solid",
    borderColor: theme.palette.secondary.main,
  },
}));

function SideNav({ selected, eventId }: Props) {
  const classes = useStyles();
  const currentUser = useAppSelector((state) => state.session.user);
  const isAdmin = currentUser?.volunteerType === VolunteerType.ADMIN;

  return (
    <List>
      <ListItem
        button
        dense
        className={selected === "details" ? classes.selected : undefined}
        component="a"
        href="#"
      >
        <ListItemText primary="Details" />
      </ListItem>

      {isAdmin && (
        <ListItem
          button
          dense
          className={selected === "volunteers" ? classes.selected : undefined}
          component="a"
          href={EVENT_VOLUNTEERS_ROUTE(eventId)}
        >
          <ListItemText primary="Volunteers" />
        </ListItem>
      )}

      <ListItem
        button
        dense
        className={selected === "feedback" ? classes.selected : undefined}
        component="a"
        href="#"
      >
        <ListItemText primary="Feedback" />
      </ListItem>
    </List>
  );
}

export default SideNav;
