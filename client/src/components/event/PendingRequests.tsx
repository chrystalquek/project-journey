import {
  makeStyles, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { EventData } from 'types/event';
import { StoreState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsUpcomingEvent } from '@redux/actions/event';
import { getPendingSignUps } from '@redux/actions/signUp';
import { SignUpData } from '@type/signUp';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getPendingVolunteers } from '@redux/actions/volunteer';
import { Tabs } from '@components/common/Tabs';
import { checkLoggedIn } from '@utils/helpers/auth';

const useStyles = makeStyles((theme) => ({
  shapeCircle: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
    borderRadius: '50%',
    textAlign: 'center',
    fontSize: 'large',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventName: {
    cursor: 'pointer',
  },
}));

const PendingRequests: FC = () => {
  checkLoggedIn()
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPendingVolunteers()); // just to load number in tab
    dispatch(getEventsUpcomingEvent({ eventType: 'upcoming' }));
    dispatch(getPendingSignUps());
  }, []);

  const events = useSelector((state: StoreState) => state.event);
  const signUps = useSelector((state: StoreState) => state.signUp);

  const upcomingEventsIds = events.upcomingEvent.ids;
  const upcomingSignUpsIds = signUps.pendingSignUps.ids;

  const upcomingEvents = upcomingEventsIds.map((id) => events.data[id]);
  const upcomingSignUps = upcomingSignUpsIds.map((id) => signUps.data[id]);

  const pendingRequestsForEvent = (event: EventData) => {
    let result = 0;
    upcomingSignUps.forEach((signUp: SignUpData) => {
      if (signUp.eventId == event._id && signUp.status == 'pending') result++;
    });
    return <div className={classes.shapeCircle}>{result}</div>;
  };

  // to make tabs
  const router = useRouter();

  const upcomingVolunteersIds = useSelector((state: StoreState) => state.volunteer).pendingVolunteers.ids;

  const tabs = [
    {
      label: `Volunteers (${upcomingVolunteersIds.length})`,
      onClick: () => router.push('/volunteer/pending-requests'),
    },
    {
      label: `Events (${upcomingEventsIds.length})`,
      onClick: () => router.push('/event/pending-requests'),
    },
  ];

  return (
    <>
      <Head>
        <title>Event Pending Requests</title>
      </Head>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <Tabs tabs={tabs} clickedOn={1} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Event Name</b></TableCell>
                  <TableCell><b>Date of Event</b></TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {upcomingEvents.map((event) => (
                  <TableRow key={event._id} hover onClick={() => router.push(`/event/${event._id}/volunteers`)}>
                    <TableCell
                      onClick={() => router.push(`/event/${event._id}`)}
                      className={classes.eventName}
                    >
                      <b>{event.name}</b>

                    </TableCell>
                    <TableCell>{event.startDate.toLocaleDateString()}</TableCell>
                    <TableCell>{pendingRequestsForEvent(event)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

    </>
  );
};

export default PendingRequests;
