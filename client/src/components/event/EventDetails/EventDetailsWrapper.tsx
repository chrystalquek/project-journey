import React, {FC} from "react";
import {AppBar, IconButton, makeStyles, Toolbar} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EventBreadCrumbs from "@components/event/EventBreadCrumbs";
import {useRouter} from "next/router";
import {EventData} from "@type/event";

type EventDetailsWrapperProps = {
  event: EventData
}

const useStyles = makeStyles({
  root: {
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'none',
  }
});

const EventDetailsWrapper: FC<EventDetailsWrapperProps> = (props) => {
  const router = useRouter();
  const classes = useStyles();
  const { event } = props;

  return (
    <>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <IconButton onClick={() => router.back()} edge="start">
            <ArrowBackIcon />
          </IconButton>
          <EventBreadCrumbs eid={event._id} />
        </Toolbar>
      </AppBar>
      {props.children}
    </>
  )
}

export { EventDetailsWrapper };