import React, {FC} from "react";
import {EventData} from "@type/event";
import {VolunteerData} from "@type/volunteer";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Box, Grid} from "@material-ui/core";
import {testEventImage1} from "@constants/imagePaths";

type EventDetailsCommittedProps = {
  event: EventData,
  user: VolunteerData
}

const EventDetailsCommitted: FC<EventDetailsCommittedProps> = ({ event, user }) => {
  const theme = useTheme();
  const screenXs = useMediaQuery(theme.breakpoints.only('xs'));
  const screenSm = useMediaQuery(theme.breakpoints.only('sm'));

  if (screenXs || screenSm) {
    // Mobile view
    return (
      <Grid container>
        <Box fontWeight='bold' fontSize="h1.fontSize">
          {event.name}
        </Box>
        {/*TODO: Replace with actual image*/}
        <img src={testEventImage1} alt={event.name} />
        <Box fontWeight='bold' fontSize="h3.fontSize">
          Event Information
        </Box>
      </Grid>
    )
  }
  // Desktop view
  return (
    <div>
      HELLO WORLD!
    </div>
  )
}

export default EventDetailsCommitted;