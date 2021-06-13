import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActions, Chip, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { EventData } from '@type/event';
import { getEventVacancies, parseDate } from '@components/event/helpers/EventsPageBody';
import { VolunteerType } from '@type/volunteer';
import { EventTypography } from '@components/common/event/EventTypography';
import { testEventImage3 } from '@utils/constants/imagePaths';
import { ADHOC_VOLUNTEER_TAG, COMMITTED_VOLUNTEER_TAG } from '@components/event/index';
import { SignUpData } from '@type/signUp';

type EventCardProps = {
  event: EventData,
  upcomingSignUps?: SignUpData[],
  onCardClick: () => void
}

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 700,
  },
  card: {
    width: '25rem',
  },
  media: {
    objectFit: 'cover',
    height: '12rem',
  },
  cardAction: {
    flexWrap: 'wrap',
  },
  committedTag: {
    borderRadius: '10px',
    opacity: 0.85,
  },
  orangeText: {
    color: theme.palette.warning.main,
  },
  greenText: {
    color: theme.palette.text.secondary,
  },
}));

const EventCard: FC<EventCardProps> = ({ event, upcomingSignUps, onCardClick }) => {
  const classes = useStyles();
  const { total, remaining } = getEventVacancies(event);
  const vacancies = `${remaining}/${total} ${remaining === 1 ? 'vacancy' : 'vacancies'} left`;
  const { date, time } = parseDate(new Date(event.startDate), new Date(event.endDate));

  const getSignUpStatus = (signUps: SignUpData[], eventData: EventData) => {
    const status = signUps.find((signUp) => signUp.eventId === eventData._id)?.status || 'unknown';
    switch (status) {
      case 'pending':
        return <Typography><i>Sign-up pending</i></Typography>;
      case 'rejected':
        return <Typography className={classes.orangeText}>Sign-up unsuccessful</Typography>;
      case 'unknown':
        return <Typography>-</Typography>;
      default:
        const roleAssigned = status[1];
        return (
          <Typography className={classes.greenText}>
            Volunteer role assigned -
            {roleAssigned}
          </Typography>
        );
    }
  };

  return (
    <Card className={classes.card} onClick={onCardClick}>
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
            {upcomingSignUps ? getSignUpStatus(upcomingSignUps, event) : vacancies}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardAction}>
        {event?.volunteerType === VolunteerType.COMMITTED
          && (
            <Chip
              color="secondary"
              size="small"
              label={COMMITTED_VOLUNTEER_TAG}
              className={classes.committedTag}
            />
          )}
        {event?.volunteerType === VolunteerType.ADHOC
          && <Chip color="primary" size="small" label={ADHOC_VOLUNTEER_TAG} />}
      </CardActions>
    </Card>
  );
};

export default EventCard;
