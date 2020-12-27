import { makeStyles, Grid, Card, CardContent, Typography } from '@material-ui/core';
import { EventState } from '@redux/reducers/event';
import { SignUpState } from '@redux/reducers/signUp';
import { UserState } from '@redux/reducers/user';
import { isAdmin } from '@utils/helpers/auth';
import { QueryParams } from 'api/request';
import { GetSignUpsResponse, GetEventsResponse } from 'api/response';
import React, { FC, useEffect } from 'react';
import { EventData } from 'types/event';

const useStyles = makeStyles((theme) => ({
    pane: {
        //  margin: theme.spacing(10),
        background: theme.palette.secondary.light,
        overflow: 'auto',
    },
    card: {
        margin: theme.spacing(8),
    },
    greenText: {
        color: theme.palette.text.secondary
    },
    orangeText: {
        color: theme.palette.warning.main
    },
}));

type UpcomingEventProps = {
    user: UserState,
    events: EventState,
    signUps: SignUpState,
    getSignUps: (query: QueryParams) => Promise<{ payload: GetSignUpsResponse }>,
    getSignedUpEvents: (query: QueryParams) => Promise<{ payload: GetEventsResponse }>,
    getEvents: (query: QueryParams) => Promise<{ payload: GetEventsResponse }>,
}


const UpcomingEvent: FC<UpcomingEventProps> = ({
    user,
    events,
    signUps,
    getSignUps,
    getSignedUpEvents,
    getEvents,
}: UpcomingEventProps) => {
    const classes = useStyles();

    useEffect(() => {
        if (isAdmin(user)) {
            getEvents({ eventType: 'upcoming' }).then((resp) => setEventIds(resp.payload.data.map(event => event._id)));
        } else {
            getSignedUpEvents({ eventType: 'upcoming', userId: user.user._id }).then((resp) => setEventIds(resp.payload.data.map(event => event._id)));
            getSignUps({ id: user.user._id, idType: 'userId' }).then((resp) => setSignUpIds(resp.payload.data.map(signUp => signUp._id)));
        }
    }, []);

    const [eventIds, setEventIds] = React.useState([]); // event list for both admin and volunteer

    const upcomingEvents = eventIds.map(id => events.data[id]);


    const [signUpIds, setSignUpIds] = React.useState([]);
    const upcomingSignUps = signUpIds.map(id => signUps.data[id]);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    const generateNotification = (event: EventData) => {
        if (isAdmin(user)) {
            const moreVolunteersCount = event.roles.map(role => role.capacity - role.volunteers.length).reduce((a, b) => a + b, 0);
            return <Typography className={(moreVolunteersCount > 0) ? classes.greenText : classes.orangeText}>{moreVolunteersCount} more volunteers needed</Typography>;
        } else {
            const status = upcomingSignUps.find(signUp => signUp.eventId == event._id).status; // will definitely be found in signUps
            switch (status) {
                case 'pending':
                    return <Typography><i>Sign-up pending</i></Typography>
                case 'rejected':
                    return <Typography className={classes.greenText}>Sign-up successful</Typography>
                default:
                    const roleAssigned = status[1];
                    return <Typography className={classes.greenText}>Volunteer role assigned - {roleAssigned}</Typography>;
            }

        }
    }

    return (<Grid className={classes.pane}><Typography variant='h4' align="center">Upcoming Events</Typography>
        {upcomingEvents.map(event =>
            <Card className={classes.card}><CardContent>
                <Typography>{event.startDate.getDate() + " " + monthNames[event.startDate.getMonth()] + " " + event.startDate.getFullYear()}</Typography>
                <Typography variant='h4'>{event.name}</Typography>
                <Typography>Time: {formatAMPM(event.startDate)} - {formatAMPM(event.endDate)}</Typography>
                {generateNotification(event)}
            </CardContent></Card>)}</Grid>);
}

export default UpcomingEvent;
