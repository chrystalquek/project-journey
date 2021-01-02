import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { testEventImage3 } from '@constants/imagePaths';
import { makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { EventData } from '@type/event';
import { getEventVacancies, parseDate } from '@utils/helpers/event/EventsPageBody';

type EventCardProps = {
  event: EventData,
  onCardClick: () => void
}

const useStyles = makeStyles({
  bold: {
    fontWeight: 700,
  },
});

const EventCard: FC<EventCardProps> = ({ event, onCardClick }) => {
  const classes = useStyles();
  const { total, remaining } = getEventVacancies(event);
  const vacancies = `${remaining}/${total} ${remaining === 1 ? 'vacancy' : 'vacancies'} left`;
  const { date, time } = parseDate(event.start_date, event.end_date);

  return (
    <Card onClick={onCardClick}>
      <CardActionArea>
        {/* How to specify height for responsive images? */}
        <CardMedia
          component="img"
          alt="EventCard"
          height="100%"
          image={testEventImage3}
          title={event && event.name ? event.name : 'EventCard'}
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
            {vacancies}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
