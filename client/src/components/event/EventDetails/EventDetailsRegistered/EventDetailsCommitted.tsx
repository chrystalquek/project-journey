import React, { FC, useCallback, useState } from 'react';
import { EventData } from '@type/event';
import { VOLUNTEER_TYPE, VolunteerData } from '@type/volunteer';
import {
  Button, Chip, Grid, makeStyles,
} from '@material-ui/core';
import { testEventImage1 } from '@constants/imagePaths';
import EventInformation from '@components/event/EventDetails/EventInformation';
import VolunteerRoles from '@components/event/EventDetails/VolunteerRoles';
import EventRegisterForm, { FormState } from '@components/event/EventDetails/EventRegisterForm';
import EventBreadCrumbs from '@components/event/EventBreadCrumbs';
import { COMMITTED_VOLUNTEER_TAG } from '@constants/index';
import { FormDisabledReason } from '@utils/helpers/event/EventDetails/EventDetails';
import { FormStatus } from '@type/event/common';
import { EventPaper } from '@components/common/event/EventPaper';
import { EventTypography } from '@components/common/event/EventTypography';
import FeedbackModal from '@components/event/FeedbackModal';

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

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
      <Button variant="contained" onClick={handleOpen}>Default</Button>

      <FeedbackModal
        title="Volunteering Regular Session"
        imageUrl="https://asset.kompas.com/crops/ssPEGiJSIZanhEErP8ZegZCpSa4=/55x0:1675x1080/750x500/data/photo/2021/01/17/60040f44ac6a3.jpeg"
        eventDate={new Date()}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Proin vel pellentesque augue, a sodales massa. Quisque sed semper libero.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Morbi"
        isOpen={isOpen}
        onClose={handleClose}
      />

      {event.volunteerType === VOLUNTEER_TYPE.COMMITED
        ? (
          <Grid className={classes.gutterBottom} item xs={12}>
            <Chip color="secondary" label={COMMITTED_VOLUNTEER_TAG} />
          </Grid>
        )
        : null}

      {formStatus.reason === FormDisabledReason.SIGNUP_PENDING
        ? (
          <Grid className={classes.gutterBottom} item xs={12}>
            <EventPaper>
              <EventTypography gutterBottom fontBold text="Sign-up Pending." />
              <EventTypography gutterBottom text="Pending approval by admin." />
            </EventPaper>
          </Grid>
        )
        : null}
      {formStatus.reason === FormDisabledReason.SIGNUP_ACCEPTED
        ? (
          <Grid className={classes.gutterBottom} item xs={12}>
            <EventPaper>
              <EventTypography gutterBottom fontBold text="Successful registration!" />
              <EventTypography gutterBottom text={`Accepted role: ${formStatus?.details || 'Error retrieving accepted role.'}`} />
            </EventPaper>
          </Grid>
        )
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
};

export default EventDetailsCommitted;
