import React, { FC } from 'react';
import { EventData } from '@type/event';
import { VOLUNTEER_TYPE, VolunteerData } from '@type/volunteer';
import {
  Chip, Grid, makeStyles,
} from '@material-ui/core';
import { testEventImage1 } from '@constants/imagePaths';
import { ADHOC_VOLUNTEER_TAG, COMMITTED_VOLUNTEER_TAG } from '@constants/index';
import { FormDisabledReason } from '@utils/helpers/event/EventDetails/EventDetails';
import VolunteerRoles from '@components/event/EventDetails/EventDetailsParts/VolunteerRoles';
import EventRegisterForm, { FormState } from '@components/event/EventDetails/EventDetailsParts/EventRegisterForm';
import FacilitatorInfo from '@components/event/EventDetails/EventDetailsParts/FacilitatorInfo';
import BecomeCommited from '@components/profile/BecomeCommitedDialog';
import { EventPaper } from '@components/common/event/EventPaper';
import { EventTypography } from '@components/common/event/EventTypography';
import { FormStatus } from '@type/event/common';
import { getAcceptedSignUp } from '@utils/helpers/event';
import ResizedImage from '../ResizedImage';

type EventDetailsAdhocProps = {
  event: EventData,
  user: VolunteerData,
  formStatus: FormStatus,
  formHandlers: {
    signUpAndAccept: (uid: string, eid: string, form: FormState) => void,
    signUpOnly: (uid: string, eid: string, form: FormState) => void
  }
}

const useStyles = makeStyles({
  gutterBottom: {
    marginBottom: '1em',
  },
  committedTag: {
    borderRadius: '10px',
    opacity: 0.85,
  },
});

const EventDetailsAdhoc: FC<EventDetailsAdhocProps> = ({
  event, user, formStatus, formHandlers,
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

      {event.volunteerType === VOLUNTEER_TYPE.COMMITED
        && (
          <Grid className={classes.gutterBottom} item xs={12}>
            <Chip
              color="secondary"
              label={COMMITTED_VOLUNTEER_TAG}
              className={classes.committedTag}
            />
          </Grid>
        )}
      {event.volunteerType === VOLUNTEER_TYPE.ADHOC
        && (
          <Grid className={classes.gutterBottom} item xs={12}>
            <Chip color="primary" label={ADHOC_VOLUNTEER_TAG} />
          </Grid>
        )}

      {formStatus.reason === FormDisabledReason.SIGNUP_PENDING
        && (
          <Grid className={classes.gutterBottom} item xs={12}>
            <EventPaper>
              <EventTypography gutterBottom fontBold text="Sign-up Pending." />
              <EventTypography gutterBottom text="Pending approval by admin." />
            </EventPaper>
          </Grid>
        )}
      {formStatus.reason === FormDisabledReason.SIGNUP_ACCEPTED
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
        {event.volunteerType === VOLUNTEER_TYPE.COMMITED
          ? <VolunteerRoles event={event} />
          : <FacilitatorInfo event={event} />}
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

      {event.volunteerType === VOLUNTEER_TYPE.COMMITED
        && (
          <div>
            <EventTypography text="This event is only opened to committed volunteers." />
            <BecomeCommited />
          </div>
        )}
    </Grid>
  );
};

export default EventDetailsAdhoc;
