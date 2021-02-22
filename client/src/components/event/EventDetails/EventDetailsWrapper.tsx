import React, { FC } from 'react';
import {
  AppBar, makeStyles, Toolbar,
} from '@material-ui/core';
import EventBreadCrumbs from '@components/event/EventBreadCrumbs';
import { EventData } from '@type/event';

type EventDetailsWrapperProps = {
  event: EventData
}

const useStyles = makeStyles({
  root: {
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'white',
  },
});

const EventDetailsWrapper: FC<EventDetailsWrapperProps> = (props) => {
  const classes = useStyles();
  const { event } = props;

  return (
    <>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <EventBreadCrumbs eid={event._id} />
        </Toolbar>
      </AppBar>
      {props.children}
    </>
  );
};

export { EventDetailsWrapper };
