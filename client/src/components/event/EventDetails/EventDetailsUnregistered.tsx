import React, {FC} from "react";
import {EventData} from "@type/event";
import {VOLUNTEER_TYPE, VolunteerData} from "@type/volunteer";
import {Box, Chip, Grid} from "@material-ui/core";
import EventBreadCrumbs from "@components/event/EventBreadCrumbs";
import {testEventImage1} from "@constants/imagePaths";
import {COMMITTED_VOLUNTEER_TAG} from "@constants/index";
import EventInformation from "@components/event/EventDetails/EventInformation";
import VolunteerRoles from "@components/event/EventDetails/VolunteerRoles";
import FacilitatorInfo from "@components/event/EventDetails/FacilitatorInfo";
import CreateAccountNotice from "@components/event/EventDetails/CreateAccountNotice";

type EventDetailsUnregisteredProps = {
  event: EventData,
  user: VolunteerData
}

const EventDetailsUnregistered: FC<EventDetailsUnregisteredProps> = ({ event, user}) => {
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

      {event.volunteerType === VOLUNTEER_TYPE.COMMITED
        ? <Grid item xs={12}>
          <Chip color="secondary" label={COMMITTED_VOLUNTEER_TAG} />
        </Grid>
        : null
      }

      <Grid item xs={12}>
        <EventInformation event={event} />
      </Grid>

      <Grid item xs={12}>
        <FacilitatorInfo event={event} />
      </Grid>

      <Grid item xs={12}>
        <CreateAccountNotice />
      </Grid>

    </Grid>
  )
}

export default EventDetailsUnregistered;
