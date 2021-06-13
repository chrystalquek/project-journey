import React, { FC } from 'react';
import { EventData } from '@type/event';
import { VolunteerType, VolunteerData } from '@type/volunteer';
import {
  Chip, Grid, makeStyles,
} from '@material-ui/core';
import { testEventImage1 } from '@utils/constants/imagePaths';
import EventInformation from '@components/event/EventDetails/EventDetailsParts/EventInformation';
import VolunteerRoles from '@components/event/EventDetails/EventDetailsParts/VolunteerRoles';
import EventRegisterForm, { FormState } from '@components/event/EventDetails/EventDetailsParts/EventRegisterForm';
import { ADHOC_VOLUNTEER_TAG, COMMITTED_VOLUNTEER_TAG } from '@components/event/index';
import { FormDisabledReason } from '@components/event/helpers/EventDetails/EventDetails';
import { EventPaper } from '@components/common/event/EventPaper';
import { EventTypography } from '@components/common/event/EventTypography';
import { getAcceptedSignUp } from '@components/event/helpers';
import { FormStatus } from '@type/form/form';
import ResizedImage from '../ResizedImage';

type EventDetailsCommittedProps = {
  event: EventData,
  user: VolunteerData,
  formStatus: FormStatus,
  formHandlers: {
    signUpAndAccept: (uid: string, eid: string, form: FormState) => void,
    signUpOnly: (uid: string, eid: string, form: FormState) => void
  }
}

const useStyles = makeStyles((theme) => ({
  gutterBottom: {
    marginBottom: '1em',
  },
  committedTag: {
    borderRadius: '10px',
    opacity: 0.85,
  },
}));

const EventDetailsCommitted: FC<EventDetailsCommittedProps> = ({
  formStatus, formHandlers, event, user,
}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={8}>
      <Grid className={classes.gutterBottom} item xs={12}>
        <EventTypography fontSize="h1" fontBold text={event.name} />
      </Grid>

      <Grid className={classes.gutterBottom} item xs={12}>
        <ResizedImage img={event?.coverImage ?? testEventImage1} name={event.name} />
      </Grid>

      {event.volunteerType === VolunteerType.COMMITTED
        && (
          <Grid className={classes.gutterBottom} item xs={12}>
            <Chip
              color="secondary"
              label={COMMITTED_VOLUNTEER_TAG}
              className={classes.committedTag}
            />
          </Grid>
        )}
      {event.volunteerType === VolunteerType.ADHOC
        && (
          <Grid className={classes.gutterBottom} item xs={12}>
            <Chip color="primary" label={ADHOC_VOLUNTEER_TAG} />
          </Grid>
        )}

      {user.volunteerType !== VolunteerType.ADMIN && formStatus.reason === FormDisabledReason.SIGNUP_PENDING
        && (
          <Grid className={classes.gutterBottom} item xs={12}>
            <EventPaper>
              <EventTypography gutterBottom fontBold text="Sign-up Pending." />
              <EventTypography gutterBottom text="Pending approval by admin." />
            </EventPaper>
          </Grid>
        )}
      {user.volunteerType !== VolunteerType.ADMIN && formStatus.reason === FormDisabledReason.SIGNUP_ACCEPTED
        && (
          <Grid className={classes.gutterBottom} item xs={12}>
            <EventPaper>
              <EventTypography gutterBottom fontBold text="Successful registration!" />
              <EventTypography
                gutterBottom
                text={
                  `Accepted role: ${getAcceptedSignUp(formStatus.details.acceptedSignUp)
                  || 'Error retrieving accepted role.'}`
                }
              />
            </EventPaper>
          </Grid>
        )}

      <Grid className={classes.gutterBottom} item xs={12}>
        <EventInformation event={event} />
      </Grid>

      <Grid className={classes.gutterBottom} item xs={12}>
        <VolunteerRoles event={event} />
      </Grid>

      {!formStatus.disabled
        && (
          <Grid className={classes.gutterBottom} item xs={12}>
            <EventRegisterForm
              isDisabled={formStatus.disabled}
              event={event}
              user={user}
              formHandlers={formHandlers}
            />
          </Grid>
        )}
    </Grid>
  );
};

export default EventDetailsCommitted;
