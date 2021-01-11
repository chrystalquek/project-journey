import React, { FC } from 'react';
import { EventData } from '@type/event';
import { VOLUNTEER_TYPE, VolunteerData } from '@type/volunteer';
import {
  Box, Chip, Grid, Link,
} from '@material-ui/core';
import EventBreadCrumbs from '@components/event/EventBreadCrumbs';
import { testEventImage1 } from '@constants/imagePaths';
import { COMMITTED_VOLUNTEER_TAG } from '@constants/index';
import { FormDisabledReason } from '@utils/helpers/event/EventDetails/EventDetails';
import EventInformation from '@components/event/EventDetails/EventInformation';
import VolunteerRoles from '@components/event/EventDetails/VolunteerRoles';
import EventRegisterForm, { FormState } from '@components/event/EventDetails/EventRegisterForm';
import FacilitatorInfo from '@components/event/EventDetails/FacilitatorInfo';
import BecomeCommited from '@components/profile/BecomeCommitedDialog';

type EventDetailsAdhocProps = {
  event: EventData,
  user: VolunteerData,
  formStatus: {
    disabled: boolean,
    reason: FormDisabledReason,
  },
  formHandlers: {
    signUpAndAccept: (uid: string, eid: string, form: FormState) => void,
    signUpOnly: (uid: string, eid: string, form: FormState) => void
  }
}

const EventDetailsAdhoc: FC<EventDetailsAdhocProps> = ({
  event, user, formStatus, formHandlers,
}) => {
  console.log(event);
  return (
    <Grid container>
      <Grid item xs={12}>
        <EventBreadCrumbs eid={event._id} />
      </Grid>
      <Grid item xs={12}>
        <Box fontWeight="bold" fontSize="h1.fontSize">
          {event.name}
        </Box>
      </Grid>

      <Grid item xs={12}>
        {/* TODO: Replace with actual image */}
        <img src={testEventImage1} alt={event.name} />
      </Grid>

      {event.volunteerType === VOLUNTEER_TYPE.COMMITED
        ? (
          <Grid item xs={12}>
            <Chip color="secondary" label={COMMITTED_VOLUNTEER_TAG} />
          </Grid>
        )
        : null}

      {/* TODO: Style */}
      {formStatus.reason === FormDisabledReason.SIGNUP_PENDING
        ? <h1>Sign-up Pending.</h1>
        : null}
      {formStatus.reason === FormDisabledReason.SIGNUP_ACCEPTED
        ? <h1>Successful registration!</h1>
        : null}

      <Grid item xs={12}>
        {event.volunteerType === VOLUNTEER_TYPE.COMMITED
          ? <VolunteerRoles event={event} />
          : <FacilitatorInfo event={event} />}
      </Grid>

      <Grid item xs={12}>
        <EventRegisterForm
          isDisabled={formStatus.disabled}
          event={event}
          user={user}
          formHandlers={formHandlers}
        />
      </Grid>

      {event.volunteerType === VOLUNTEER_TYPE.COMMITED
        ? (
          <div>
            <div>This event is only opened to committed volunteers.</div>
            <BecomeCommited />
          </div>
        )
        : null}
    </Grid>
  );
};

export default EventDetailsAdhoc;
