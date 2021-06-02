import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {
  Button, CardActions, Chip, makeStyles,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import { EventData } from '@type/event';
import { parseDate } from '@utils/helpers/event/EventsPageBody';
import { VolunteerType } from '@type/volunteer';
import { EventTypography } from '@components/common/event/EventTypography';
import { testEventImage3 } from '@constants/imagePaths';
import { ADHOC_VOLUNTEER_TAG, COMMITTED_VOLUNTEER_TAG } from '@constants/index';
import FeedbackModal from './FeedbackModal';

type EventCardProps = {
  event: EventData,
  onCardClick: () => void
}

const useStyles = makeStyles((theme) => ({
  viewFeedbackButton: {
    textTransform: 'none',
    color: theme.palette.text.disabled,
    fontWeight: 'bold',
  },
  submitFeedbackButton: {
    textTransform: 'none',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
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
}));

const PastEventCard: FC<EventCardProps> = ({ event, onCardClick }) => {
  const classes = useStyles();
  const { date, time } = parseDate(new Date(event.startDate), new Date(event.endDate));

  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt="EventCard"
          image={event?.coverImage ?? testEventImage3}
          title={event && event.name ? event.name : 'EventCard'}
        />
        <CardContent onClick={onCardClick}>
          <EventTypography gutterBottom fontBold text={event && event.name ? event.name : 'No event name provided'} />
          <EventTypography text={date || 'No date provided'} />
          <EventTypography gutterBottom text={time || 'No time provided'} />

        </CardContent>
      </CardActionArea>

      <Button
        className={event?.feedbackStatus
          ? classes.viewFeedbackButton
          : classes.submitFeedbackButton}
        onClick={() => setOpen(true)}
      >
        {event?.feedbackStatus
          ? 'View Submitted Feedback'
          : 'Submit Volunteer Feedback'}
      </Button>
      <FeedbackModal
        title={event.name}
        imageUrl={event?.coverImage}
        eventDate={new Date(event.startDate)}
        description={event.description}
        isOpen={isOpen}
        eventId={event._id}
        initialState={event?.feedbackStatus ? 'success' : 'prompt'}
        onClose={() => setOpen(false)}
      />

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

export default PastEventCard;
