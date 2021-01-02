<<<<<<< HEAD:src/components/admin/AdminEvent.tsx
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { testEventImage3 } from '@constants/imagePaths';
import { makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { EventData } from '@type/event';
import { getVacancies, parseDate } from '@utils/event';

type AdminEventProps = {
  event: EventData,
}

const useStyles = makeStyles({
  bold: {
    fontWeight: 700,
  },
});

const AdminEvent: FC<AdminEventProps> = ({ event }) => {
  const classes = useStyles();
  const { filled, total } = getVacancies(event);
  const { date, time } = parseDate(event.startDate, event.endDate);

  return (
    <Card>
      <CardActionArea>
        {/* How to specify height for responsive images? */}
        <CardMedia
          component="img"
          alt="Event"
          height="100%"
          image={testEventImage3}
          title={event && event.name ? event.name : 'Event'}
        />
        <CardContent>
          <Typography gutterBottom className={classes.bold}>
            {event && event.name ? event.name : 'No event name provided'}
          </Typography>
          <Typography>
            {date || 'No date provided'}
          </Typography>
          <Typography gutterBottom>
            {time || 'No time provided'}
          </Typography>
          <Typography color="primary" gutterBottom className={classes.bold}>
            {filled}
            /
            {total}
            {' '}
            {filled == 1 ? 'vacancy' : 'vacancies'}
            {' '}
            left
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AdminEvent;
=======
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { testEventImage3 } from '@constants/imagePaths';
import { makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { EventData } from '@type/event';
import { getVacancies, parseDate } from '@utils/helpers/EventsPage';

type AdminEventProps = {
  event: EventData,
}

const useStyles = makeStyles({
  bold: {
    fontWeight: 700,
  },
});

const Event: FC<AdminEventProps> = ({ event }) => {
  const classes = useStyles();
  const { filled, total } = getVacancies(event);
  const { date, time } = parseDate(event.start_date, event.end_date);

  return (
    <Card>
      <CardActionArea>
        {/* How to specify height for responsive images? */}
        <CardMedia
          component="img"
          alt="Event"
          height="100%"
          image={testEventImage3}
          title={event && event.name ? event.name : 'Event'}
        />
        <CardContent>
          <Typography gutterBottom className={classes.bold}>
            {event && event.name ? event.name : 'No event name provided'}
          </Typography>
          <Typography>
            {date || 'No date provided'}
          </Typography>
          <Typography gutterBottom>
            {time || 'No time provided'}
          </Typography>
          <Typography color="primary" gutterBottom className={classes.bold}>
            {filled}
            /
            {total}
            {' '}
            {filled == 1 ? 'vacancy' : 'vacancies'}
            {' '}
            left
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Event;
>>>>>>> 6128b0cf15002308b7280ca422451124312f0e98:src/components/event/Event.tsx
