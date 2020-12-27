import { makeStyles, Grid, Card, CardContent, Typography } from '@material-ui/core';
import React, { FC, useEffect } from 'react';

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
    events: Array<any>
}

const UpcomingEvent: FC<UpcomingEventProps> = ({
    events
}: UpcomingEventProps) => {
    const classes = useStyles();

    // Only load on initial render to prevent infinite loop
    useEffect(() => {
        // getAllVolunteers();
    }, []);

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

    const generateNotification = (event) => {
        if (true || isAdmin) {
            const moreVolunteersCount = 1 || event.roles.reduce(role => role.capacity - role.volunteers.length, 0);
            return <Typography className={(moreVolunteersCount > 0) ? classes.greenText : classes.orangeText}>{moreVolunteersCount} more volunteers needed</Typography>;
        } else {
            "Volunteer role assigned - Photographer"
            "Sign-up pending"
            "Sign-up successful"
        }
    }

    return (<Grid className={classes.pane}><Typography variant='h4' align="center">Upcoming Events</Typography>
        {events.map(event =>
            <Card className={classes.card}><CardContent>
                <Typography>{event.startDate.getDate() + " " + monthNames[event.startDate.getMonth()] + " " + event.startDate.getFullYear()}</Typography>
                <Typography variant='h4'>{event.name}</Typography>
                <Typography>Time: {formatAMPM(event.startDate)} - {formatAMPM(event.endDate)}</Typography>
                {generateNotification(event)}
            </CardContent></Card>)}</Grid>);
}

export default UpcomingEvent;