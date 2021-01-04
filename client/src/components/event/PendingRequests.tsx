import { makeStyles, Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { isAdmin } from '@utils/helpers/auth';
import React, { FC, useEffect } from 'react';
import { EventData } from 'types/event';
import { StoreState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsUpcomingEvent, getSignedUpEventsUpcomingEvent } from '@redux/actions/event';
import { getPendingSignUps, getSignUpsUpcomingEvent } from '@redux/actions/signUp';
import { MONTHS, formatAMPM, formatDateStartEndTime } from '@utils/helpers/date';
import dummyUser from '@constants/dummyUser';
import { SignUpData } from '@type/signUp';
import NavBar from '@components/common/NavBar';
import { Footer } from 'antd/lib/layout/layout';
import Head from 'next/head';

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
        alignItems: 'center'
    },
}));


const PendingRequests: FC<{}> = ({ }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const user = useSelector((state: StoreState) => state.user);

    useEffect(() => {
        dispatch(getEventsUpcomingEvent({ eventType: 'upcoming' }))
        dispatch(getPendingSignUps())
    }, []);

    const events = useSelector((state: StoreState) => state.event)
    const signUps = useSelector((state: StoreState) => state.signUp)

    const upcomingEventsIds = events.upcomingEvent.ids;
    const upcomingSignUpsIds = signUps.pendingSignUps.ids;

    const upcomingEvents = upcomingEventsIds.map(id => events.data[id])
    const upcomingSignUps = upcomingSignUpsIds.map(id => signUps.data[id])

    const pendingRequestsForEvent = (event: EventData) => {
        let result = 0
        upcomingSignUps.forEach((signUp: SignUpData) => {
            if (signUp.eventId == event._id && signUp.status == 'pending')
                result++
        })
        return <div className={classes.shapeCircle}>{result}</div>
    }

    return (
        <>
            <Head>
                <title>Event Pending Requests</title>
            </Head>
            <NavBar userData={user.user} />
            <Grid container alignItems="center" justify="center">
                <Grid item xs={8}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Event Name</b></TableCell>
                                    <TableCell><b>Date of Event</b></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {upcomingEvents.map((event) => (
                                    <TableRow key={event._id}>
                                        <TableCell><b>{event.name}</b></TableCell>
                                        <TableCell>{event.startDate.toLocaleDateString()}</TableCell>
                                        <TableCell>{pendingRequestsForEvent(event)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Footer />

        </>);
}

export default PendingRequests;
