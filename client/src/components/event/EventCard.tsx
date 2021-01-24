import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {CardActions, Chip, makeStyles} from '@material-ui/core';
import {FC} from 'react';
import {EventData} from '@type/event';
import {getEventVacancies, parseDate} from '@utils/helpers/event/EventsPageBody';
import {VOLUNTEER_TYPE} from "@type/volunteer";
import {EventTypography} from "@components/common/event/EventTypography";
import {testEventImage3} from "@constants/imagePaths";
import {ADHOC_VOLUNTEER_TAG, COMMITTED_VOLUNTEER_TAG} from "@constants/index";

type EventCardProps = {
  event: EventData,
  onCardClick: () => void
}

const useStyles = makeStyles({
  bold: {
    fontWeight: 700,
  },
  media: {
    objectFit: 'cover',
    height: '12rem',
  },
  cardAction: {
    flexWrap: 'wrap'
  }
});

const EventCard: FC<EventCardProps> = ({ event, onCardClick }) => {
  const classes = useStyles();
  const { total, remaining } = getEventVacancies(event);
  const vacancies = `${remaining}/${total} ${remaining === 1 ? 'vacancy' : 'vacancies'} left`;
  const { date, time } = parseDate(event.startDate, event.endDate);

  return (
    <Card onClick={onCardClick}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt="EventCard"
          image={event?.coverImage ?? testEventImage3}
          title={event && event.name ? event.name : 'EventCard'}
        />
        <CardContent>
          <EventTypography gutterBottom fontBold text={event && event.name ? event.name : 'No event name provided'} />
          <EventTypography text={date || 'No date provided'} />
          <EventTypography gutterBottom text={time || 'No time provided'} />
          <Typography color="primary" gutterBottom className={classes.bold}>
            {vacancies}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardAction}>
        {event?.volunteerType === VOLUNTEER_TYPE.COMMITED &&
          <Chip color="secondary" size="small" label={COMMITTED_VOLUNTEER_TAG} />
        }
        {event?.volunteerType === VOLUNTEER_TYPE.ADHOC &&
          <Chip color="primary" size="small" label={ADHOC_VOLUNTEER_TAG} />
        }
      </CardActions>
    </Card>
  );
};

export default EventCard;
