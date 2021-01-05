import React, {FC} from "react";
import {EventData} from "@type/event";
import {VolunteerData} from "@type/volunteer";
import {Box, Chip, Grid} from "@material-ui/core";
import {testEventImage1} from "@constants/imagePaths";
import EventInformation from "@components/event/EventDetails/EventInformation";
import VolunteerRoles from "@components/event/EventDetails/VolunteerRoles";
import EventRegisterForm from "@components/event/EventDetails/EventRegisterForm";
import EventBreadCrumbs from "@components/event/EventBreadCrumbs";
import {getEventVacancies} from "@utils/helpers/event/EventsPageBody";
import {COMMITTED_VOLUNTEER_TAG} from "@constants/index";

type EventDetailsCommittedProps = {
  event: EventData,
  user: VolunteerData
}

const EventDetailsCommitted: FC<EventDetailsCommittedProps> = ({ event, user }) => {
  const { remaining } = getEventVacancies(event);
  const isFull = remaining === 0;

  return (
    <Grid container>
      <Grid item xs={12}>
        <EventBreadCrumbs eid={event._id} />
      </Grid>
      <Grid item xs={12}>
        <Box fontWeight='bold' fontSize="h1.fontSize">
          {event.name}
        </Box>
      </Grid>

      <Grid item xs={12}>
        {/*TODO: Replace with actual image*/}
        <img src={testEventImage1} alt={event.name} />
      </Grid>

      <Grid item xs={12}>
        <Chip color="secondary" label={COMMITTED_VOLUNTEER_TAG} />
      </Grid>

      <Grid item xs={12}>
        <EventInformation event={event} />
      </Grid>

      <Grid item xs={12}>
        <VolunteerRoles event={event} />
      </Grid>

      <Grid item xs={12}>
        <EventRegisterForm isDisabled={isFull} event={event} />
      </Grid>
    </Grid>
  )
}

export default EventDetailsCommitted;