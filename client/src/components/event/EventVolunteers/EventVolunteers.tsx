import {
  makeStyles, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { EventData } from 'types/event';
import { StoreState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsUpcomingEvent, getEvent } from '@redux/actions/event';
import { getVolunteersById } from '@redux/actions/volunteer';
import { getPendingSignUps } from '@redux/actions/signUp';
import { SignUpData } from '@type/signUp';
import NavBar from '@components/common/NavBar';
import { Footer } from 'antd/lib/layout/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Tabs } from '@components/common/Tabs';
import { unwrapResult } from '@reduxjs/toolkit';
import { NumberSchema } from 'yup';

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
}));

const EventVolunteers = ({ eid }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state: StoreState) => state.user);

  useEffect(() => {
    if (eid) {
      dispatch(getEvent(eid));
    }
  }, [eid]);

  const event = useSelector((state: StoreState) => state.event.form);

  const [eventRoles, setEventRoles] = useState(event.roles);
  const [eventRolesWithVolunteerData, setEventRolesWithVolunteerData] = useState(null);
  const [numOfApprovedVolunteers, setNumOfApprovedVolunteers] = useState(0);

  useEffect(() => {
    // Set roles

    if (event.roles) {
      setEventRoles(event.roles);

      // Set Event Roles with Volunteer Data
      const temp = event.roles.map((role) => role.volunteers
        .map((volunteer) => {
          dispatch(getVolunteersById(volunteer))
            .then(unwrapResult);
        }));
      console.log(temp);
      setEventRolesWithVolunteerData(temp);

      // Set Number of Approved volunteers
      const num: number = event.roles
        .map((role) => role.volunteers)
        .reduce((acc, el) => acc + el.length, 0);
      setNumOfApprovedVolunteers(num);
    }
  }, [event]);

  //   const signUps = useSelector((state: StoreState) => state.signUp);

  //   const upcomingEventsIds = events.upcomingEvent.ids;
  //   const upcomingSignUpsIds = signUps.pendingSignUps.ids;

  //   const upcomingEvents = upcomingEventsIds.map((id) => events.data[id]);
  //   const upcomingSignUps = upcomingSignUpsIds.map((id) => signUps.data[id]);

  //   const pendingRequestsForEvent = (event: EventData) => {
  //     let result = 0;
  //     upcomingSignUps.forEach((signUp: SignUpData) => {
  //       if (signUp.eventId == event._id && signUp.status == 'pending') { result++; }
  //     });
  //     return <div className={classes.shapeCircle}>{result}</div>;
  //   };

  // to make tabs
  const router = useRouter();

  const tabs = [
    {
      key: 'volunteers',
      label: `Volunteers (${numOfApprovedVolunteers})`,
      onClick: () => router.push(`/event/${eid}/volunteers`),
    },
    // {
    //   label: `Pending (${upcomingEventsIds.length})`,
    //   onClick: () => router.push('/event/${eid}/volunteers-pending'),
    // },
  ];

  return (
    <>
      <Head>
        <title>{event.name}</title>
      </Head>
      <NavBar userData={user.user} />
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <Tabs tabs={tabs} clickedOn={1} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Contact Number</b></TableCell>
                  <TableCell><b>Role</b></TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {eventRolesWithVolunteerData
                && eventRolesWithVolunteerData.map((role) => (
                  role.volunteers?.map(((volunteer) => (
                    <TableRow key={volunteer._id}>
                      <TableCell><b>{volunteer.name}</b></TableCell>
                      <TableCell>{volunteer.mobileNumber}</TableCell>
                      <TableCell>{role.name}</TableCell>
                    </TableRow>
                  )))
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Footer />

    </>
  );
};

export default EventVolunteers;
