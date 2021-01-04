import { makeStyles, Grid, Card, CardContent, Typography } from '@material-ui/core';
import { isAdmin } from '@utils/helpers/auth';
import React, { FC, useEffect } from 'react';
import { EventData } from 'types/event';
import { StoreState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsUpcomingEvent, getSignedUpEventsUpcomingEvent } from '@redux/actions/event';
import { getSignUpsUpcomingEvent } from '@redux/actions/signUp';
import { formatDateStartEndTime } from '@utils/helpers/date';

const useStyles = makeStyles((theme) => ({
    pane: {
        background: theme.palette.secondary.light,
        overflow: 'auto',
    },
    card: {
        margin: theme.spacing(5),
    },
    greenText: {
        color: theme.palette.text.secondary
    },
    orangeText: {
        color: theme.palette.warning.main
    },
    header: {
        padding: theme.spacing(5)
    }
}));


const UpcomingEvent: FC<{}> = ({ }) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const user = useSelector((state: StoreState) => state.user);

    useEffect(() => {
        if (isAdmin(user)) {
            dispatch(getEventsUpcomingEvent({ eventType: 'upcoming' }))
        } else {
            dispatch(getSignedUpEventsUpcomingEvent({ eventType: 'upcoming', userId: user.user?._id }))
            dispatch(getSignUpsUpcomingEvent({ id: user.user._id, idType: 'userId' }))
        }
    }, []);

    const events = useSelector((state: StoreState) => state.event)
    const signUps = useSelector((state: StoreState) => state.signUp) // only relevant if user is volunteer

    const upcomingEventsIds = events.upcomingEvent.ids;
    const upcomingSignUpsIds = signUps.volunteerSignUpsForUpcomingEvent.ids;

    const upcomingEvents = upcomingEventsIds.map(id => events.data[id])
    const upcomingSignUps = upcomingSignUpsIds.map(id => signUps.data[id])

    const generateNotification = (event: EventData) => {
        if (isAdmin(user)) {
            const moreVolunteersCount = event.roles.map(role => role.capacity - role.volunteers.length).reduce((a, b) => a + b, 0);
            return <Typography className={(moreVolunteersCount > 0) ? classes.greenText : classes.orangeText}>{moreVolunteersCount} more volunteers needed</Typography>;
        } else {
            const status = upcomingSignUps.find(signUp => signUp.eventId == event._id)?.status || 'unknown';
            switch (status) {
                case 'pending':
                    return <Typography><i>Sign-up pending</i></Typography>
                case 'rejected':
                    return <Typography className={classes.orangeText}>Sign-up unsuccessful</Typography>
                case 'unknown':
                    return <Typography>-</Typography>
                default:
                    const roleAssigned = status[1];
                    return <Typography className={classes.greenText}>Volunteer role assigned - {roleAssigned}</Typography>;
            }

        }
    }

    return (<Grid className={classes.pane}><Typography className={classes.header} variant='h4' align="center">{isAdmin(user) ? "" : "My "}Upcoming Events</Typography>
        {upcomingEvents.map(event =>
            <Card className={classes.card} key={event._id}><CardContent>
                <Typography>{formatDateStartEndTime(event.startDate, event.endDate).date}</Typography>
                <Typography variant='h4'>{event.name}</Typography>
                <Typography>Time: {formatDateStartEndTime(event.startDate, event.endDate).time}</Typography>
                {generateNotification(event)}
            </CardContent></Card>)}</Grid>);
}

export default UpcomingEvent;
