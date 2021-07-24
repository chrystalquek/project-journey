import React, { FC } from "react";
import { EventData } from "@type/event";
import { VolunteerType, VolunteerData } from "@type/volunteer";
import { Chip, Grid, makeStyles, Typography } from "@material-ui/core";
import { testEventImage1 } from "@utils/constants/imagePaths";
import {
  ALL_VOLUNTEERS_TAG,
  COMMITTED_VOLUNTEER_TAG,
} from "@components/event/index";
import EventInformation from "@components/event/EventDetails/EventDetailsParts/EventInformation";
import FacilitatorInfo from "@components/event/EventDetails/EventDetailsParts/FacilitatorInfo";
import CreateAccountNotice from "@components/event/EventDetails/EventDetailsParts/CreateAccountNotice";
import ResizedImage from "../../common/image/ResizedImage";

type EventDetailsUnregisteredProps = {
  event: EventData;
  user: VolunteerData;
};

const useStyles = makeStyles({
  gutterBottom: {
    marginBottom: "0.7em",
  },
  committedTag: {
    borderRadius: "10px",
    opacity: 0.85,
  },
});

const EventDetailsUnregistered: FC<EventDetailsUnregisteredProps> = ({
  event,
}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={8}>
      <Grid className={classes.gutterBottom} item xs={12}>
        <Typography style={{ fontWeight: "bold" }} variant="h1">
          {event.name}
        </Typography>
      </Grid>

      <Grid className={classes.gutterBottom} item xs={12}>
        <ResizedImage
          img={event?.coverImage ?? testEventImage1}
          name={event.name}
        />
      </Grid>

      {event.volunteerType === VolunteerType.COMMITTED && (
        <Grid className={classes.gutterBottom} item xs={12}>
          <Chip
            color="secondary"
            label={COMMITTED_VOLUNTEER_TAG}
            className={classes.committedTag}
          />
        </Grid>
      )}
      {event.volunteerType === VolunteerType.ADHOC && (
        <Grid className={classes.gutterBottom} item xs={12}>
          <Chip color="primary" label={ALL_VOLUNTEERS_TAG} />
        </Grid>
      )}

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
