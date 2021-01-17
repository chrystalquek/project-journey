import React, { FC } from 'react';
import { EventData } from '@type/event';
import { VOLUNTEER_TYPE, VolunteerData } from '@type/volunteer';
import {Box, Chip, CircularProgress, Grid, makeStyles} from '@material-ui/core';
import { testEventImage1 } from '@constants/imagePaths';
import EventInformation from '@components/event/EventDetails/EventInformation';
import VolunteerRoles from '@components/event/EventDetails/VolunteerRoles';
import EventRegisterForm, { FormState } from '@components/event/EventDetails/EventRegisterForm';
import EventBreadCrumbs from '@components/event/EventBreadCrumbs';
import { COMMITTED_VOLUNTEER_TAG } from '@constants/index';
import { FormDisabledReason } from '@utils/helpers/event/EventDetails/EventDetails';
import {FormStatus} from "@type/event/common";
import {EventPaper} from '@components/common/event/EventPaper';
import {EventTypography} from '@components/common/event/EventTypography';

type EventDetailsCommittedProps = {
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
    marginBottom: '0.7em',
  },
});

const EventDetailsCommitted: FC<EventDetailsCommittedProps> = ({
  formStatus, formHandlers, event, user,
}) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid className={classes.gutterBottom} item xs={12}>
        <EventBreadCrumbs eid={event._id} />
      </Grid>
      <Grid className={classes.gutterBottom} item xs={12}>
        <EventTypography fontSize="h1" fontBold text={event.name} />
      </Grid>

      <Grid className={classes.gutterBottom} item xs={12}>
        {/* TODO: Replace with actual image */}
        <img src={testEventImage1} alt={event.name} />
      </Grid>

      {event.volunteerType === VOLUNTEER_TYPE.COMMITED
        ? (
          <Grid className={classes.gutterBottom} item xs={12}>
            <Chip color="secondary" label={COMMITTED_VOLUNTEER_TAG} />
          </Grid>
        )
        : null}

      {formStatus.reason === FormDisabledReason.SIGNUP_PENDING
        ? <Grid className={classes.gutterBottom} item xs={12}>
          <EventPaper>
            <EventTypography gutterBottom fontBold text="Sign-up Pending." />
            <EventTypography gutterBottom text="Pending approval by admin." />
          </EventPaper>
        </Grid>
        : null}
      {formStatus.reason === FormDisabledReason.SIGNUP_ACCEPTED
        ? <Grid className={classes.gutterBottom} item xs={12}>
          <EventPaper>
            <EventTypography gutterBottom fontBold text="Successful registration!" />
            <EventTypography gutterBottom text={`Accepted role: ${formStatus?.details || "Error retrieving accepted role."}`} />
          </EventPaper>
        </Grid>
        : null}

      <Grid className={classes.gutterBottom} item xs={12}>
        <EventInformation event={event} />
      </Grid>

      <Grid className={classes.gutterBottom} item xs={12}>
        <VolunteerRoles event={event} />
      </Grid>

      <Grid className={classes.gutterBottom} item xs={12}>
        <EventRegisterForm
          isDisabled={formStatus.disabled}
          event={event}
          user={user}
          formHandlers={formHandlers}
        />
      </Grid>
    </Grid>
  );
}

export default EventDetailsCommitted;
