import React, {FC} from "react";
import {EventData} from "@type/event";
import {VolunteerData} from "@type/volunteer";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Box, Grid} from "@material-ui/core";
import {testEventImage1} from "@constants/imagePaths";
import EventInformation from "@components/event/EventDetails/EventInformation";
import VolunteerRoles from "@components/event/EventDetails/VolunteerRoles";
import EventRegisterForm from "@components/event/EventDetails/EventRegisterForm";
import EventBreadCrumbs from "@components/event/EventBreadCrumbs";

type EventDetailsCommittedProps = {
  event: EventData,
  user: VolunteerData
}

const EventDetailsCommitted: FC<EventDetailsCommittedProps> = ({ event, user }) => {
  const theme = useTheme();
  const screenXs = useMediaQuery(theme.breakpoints.only('xs'));
  const screenSm = useMediaQuery(theme.breakpoints.only('sm'));

  // Mobile view
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
        <EventInformation event={event} />
      </Grid>

      <Grid item xs={12}>
        <VolunteerRoles event={event} />
      </Grid>

      <Grid item xs={12}>
        <EventRegisterForm event={event} />
      </Grid>
    </Grid>
  )
}

export default EventDetailsCommitted;