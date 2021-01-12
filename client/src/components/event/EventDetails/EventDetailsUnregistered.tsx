import React, { FC } from 'react';
import { EventData } from '@type/event';
import { VOLUNTEER_TYPE, VolunteerData } from '@type/volunteer';
import {
  Box, Chip, Grid, makeStyles,
} from '@material-ui/core';
import EventBreadCrumbs from '@components/event/EventBreadCrumbs';
import { testEventImage1 } from '@constants/imagePaths';
import { COMMITTED_VOLUNTEER_TAG } from '@constants/index';
import EventInformation from '@components/event/EventDetails/EventInformation';
import FacilitatorInfo from '@components/event/EventDetails/FacilitatorInfo';
import CreateAccountNotice from '@components/event/EventDetails/CreateAccountNotice';
import { EventTypography } from '@components/common/event/EventTypography';
import {EventDivider} from "@components/common/event/EventDivider";

type EventDetailsUnregisteredProps = {
  event: EventData,
  user: VolunteerData
}

const useStyles = makeStyles({
  gutterBottom: {
    marginBottom: '0.7em',
  },
});

const EventDetailsUnregistered: FC<EventDetailsUnregisteredProps> = ({ event, user }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid className={classes.gutterBottom} item xs={12}>
        <EventBreadCrumbs eid={event._id} />
      </Grid>

      <Grid className={classes.gutterBottom} item xs={12}>
        <EventTypography text={event.name} fontBold fontSize="h1" />
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

      <Grid className={classes.gutterBottom} item xs={12}>
        <EventInformation event={event} />
      </Grid>

      <Grid className={classes.gutterBottom} item xs={12}>
        <FacilitatorInfo event={event} />
      </Grid>

      <Grid className={classes.gutterBottom} item xs={12}>
        <CreateAccountNotice />
      </Grid>

    </Grid>
  );
};

export default EventDetailsUnregistered;
