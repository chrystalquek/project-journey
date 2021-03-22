import React, { FC } from 'react';
import {
  AppBar, makeStyles, Toolbar, useMediaQuery,
} from '@material-ui/core';
import EventBreadCrumbs from '@components/event/EventBreadCrumbs';
import { EventData } from '@type/event';
import theme from '@styles/theme';

type EventDetailsWrapperProps = {
  event: EventData
}

const useStyles = makeStyles({
  root: {
    boxShadow: 'none',
    backgroundColor: 'white',
  },
  toolbar: {
    paddingLeft: 0,
  },
});

const EventDetailsWrapper: FC<EventDetailsWrapperProps> = (props) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const { event, children } = props;

  return (
    <div style={{
      marginLeft: isDesktop ? theme.spacing(9) : 0,
    }}
    >
      <AppBar
        className={classes.root}
        position="static"
      >
        <Toolbar
          className={classes.toolbar}
        >
          <EventBreadCrumbs eid={event._id} />
        </Toolbar>
      </AppBar>
      <div style={{
        marginLeft: '0',
      }}
      >
        { children }
      </div>
    </div>
  );
};

export { EventDetailsWrapper };
