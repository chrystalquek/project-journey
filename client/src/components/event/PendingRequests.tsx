import {
  makeStyles, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { EventData } from '@type/event';
import { StoreState, useAppDispatch, useAppSelector } from '@redux/store';
import { getEventsUpcomingEvent } from '@redux/actions/event';
import { getPendingSignUps } from '@redux/actions/signUp';
import { SignUpData } from '@type/signUp';
import Head from 'next/head';
import { checkLoggedIn } from '@utils/helpers/auth';
import PendingRequestsTabs from '@components/common/PendingRequestsTabs';
import { useRouter } from 'next/router';

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
  checkLoggedIn();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getEventsUpcomingEvent({ eventType: 'upcoming' }));
    dispatch(getPendingSignUps());
  }, []);

  const events = useAppSelector((state) => state.event);
  const signUps = useAppSelector((state) => state.signUp);

  const upcomingEventsIds = events.upcomingEvent.ids;
  const upcomingSignUpsIds = signUps.pendingSignUps.ids;

  const upcomingEvents = upcomingEventsIds.map((id) => events.data[id]);
  const upcomingSignUps = upcomingSignUpsIds.map((id) => signUps.data[id]);

  const pendingRequestsForEventCount = (event: EventData) => {
    let result = 0;
    upcomingSignUps.forEach((signUp: SignUpData) => {
      if (signUp.eventId == event._id && signUp.status == 'pending') result++;
    });
    return result;
  };

  const upcomingEventsWithPendingSignUps = upcomingEvents.filter((event) => (pendingRequestsForEventCount(event) != 0));

  return (
    <>
      <Head>
        <title>Event Pending Requests</title>
      </Head>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <PendingRequestsTabs clickedOn={1} />
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
                {upcomingEventsWithPendingSignUps.map((event) => (
                  <TableRow key={event._id} hover onClick={() => router.push(`/event/${event._id}/volunteers`)}>
                    <TableCell
                      onClick={() => router.push(`/event/${event._id}`)}
                      className={classes.eventName}
                    >
                      <b>{event.name}</b>

                    </TableCell>
                    <TableCell>{new Date(event.startDate).toLocaleDateString()}</TableCell>
                    <TableCell><div className={classes.shapeCircle}>{pendingRequestsForEventCount(event)}</div></TableCell>
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
