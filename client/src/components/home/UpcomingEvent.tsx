import {
  makeStyles, Grid, Card, CardContent, Typography, Button,
} from '@material-ui/core';
import { isAdmin } from '@utils/helpers/auth';
import React, { FC, useEffect } from 'react';
import { EventData } from 'types/event';
import { StoreState, useAppDispatch, useAppSelector } from '@redux/store';
import { getEventsUpcomingEvent, getSignedUpEventsUpcomingEvent } from '@redux/actions/event';
import { getSignUpsUpcomingEvent } from '@redux/actions/signUp';
import { formatDateStartEndTime } from '@utils/helpers/date';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  pane: {
    background: theme.palette.secondary.light,
    overflow: 'scroll',
    height: '70vh',
  },
  card: {
    margin: theme.spacing(5),
    cursor: 'pointer',
  },
  greenText: {
    color: theme.palette.text.secondary,
  },
  orangeText: {
    color: theme.palette.warning.main,
  },
  header: {
    padding: theme.spacing(5),
  },
  button: {
    padding: theme.spacing(5),
    margin: theme.spacing(5),
    backgroundColor: theme.palette.primary.main,
    height: 30,
    borderRadius: '5em',
    fontSize: 'small',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEvents: {
    position: 'relative',
    top: '30%',
  },
}));

const UpcomingEvent: FC<{}> = ({ }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isAdmin(user)) {
      dispatch(getEventsUpcomingEvent({ eventType: 'upcoming' }));
    } else {
      dispatch(getSignedUpEventsUpcomingEvent({ eventType: 'upcoming', userId: user.user?._id }));
      dispatch(getSignUpsUpcomingEvent({ id: user.user?._id, idType: 'userId' }));
    }
  }, []);

  const events = useAppSelector((state) => state.event);
  const signUps = useAppSelector((state) => state.signUp); // only relevant if user is volunteer

  const upcomingEventsIds = events.upcomingEvent.ids;
  const upcomingSignUpsIds = signUps.volunteerSignUpsForUpcomingEvent.ids;

  const upcomingEvents = upcomingEventsIds.map((id) => events.data[id]);
  const upcomingSignUps = upcomingSignUpsIds.map((id) => signUps.data[id]);

  const generateNotification = (event: EventData) => {
    if (isAdmin(user)) {
      const moreVolunteersCount = event.roles.map((role) => role.capacity - role.volunteers.length).reduce((a, b) => a + b, 0);
      return (
        <Typography className={(moreVolunteersCount > 0) ? classes.greenText : classes.orangeText}>
          {moreVolunteersCount}
          {' '}
          more volunteers needed
        </Typography>
      );
    }
    // is volunteer
    const status = upcomingSignUps.find((signUp) => signUp.eventId == event._id)?.status || 'unknown';
    switch (status) {
      case 'pending':
        return <Typography><i>Sign-up pending</i></Typography>;
      case 'rejected':
        return <Typography className={classes.orangeText}>Sign-up unsuccessful</Typography>;
      case 'unknown':
        return <Typography>-</Typography>;
      default:
        const roleAssigned = status[1];
        return (
          <Typography className={classes.greenText}>
            Volunteer role assigned -
            {roleAssigned}
          </Typography>
        );
    }
  };

  const adminNoEventsUpcoming = (
    <Typography align="center">
      There are no events upcoming.
      <br />
      Click below to create a new event.
      <br />
      <Button className={classes.button} onClick={() => router.push('/form/new')}>Create New Event</Button>
    </Typography>
  );

  const volunteerNoEventsUpcoming = (
    <Typography align="center">
      You have no events upcoming.
      <br />
      Click below to browse events.
      <br />
      <Button className={classes.button} onClick={() => router.push('/event')}>Browse Events</Button>
    </Typography>
  );

  return (
    <div className={classes.pane}>
      <Typography className={classes.header} variant="h4" align="center">
        {isAdmin(user) ? '' : 'My '}
        Upcoming Events
      </Typography>
      {upcomingEvents.length == 0
        ? <div className={classes.noEvents}>{isAdmin(user) ? adminNoEventsUpcoming : volunteerNoEventsUpcoming}</div>
        : upcomingEvents.map((event) => (
          <Card className={classes.card} key={event._id} onClick={() => router.push(`/event/${event._id}`)}>
            <CardContent>
              <Typography>{formatDateStartEndTime(new Date(event.startDate), new Date(event.endDate)).date}</Typography>
              <Typography variant="h4">{event.name}</Typography>
              <Typography>
                Time:
                {' '}
                {formatDateStartEndTime(new Date(event.startDate), new Date(event.endDate)).time}
              </Typography>
              {generateNotification(event)}
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default UpcomingEvent;
