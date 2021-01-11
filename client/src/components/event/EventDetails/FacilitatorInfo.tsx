import React, {FC} from "react";
import {Grid} from "@material-ui/core";
import {EventData} from "@type/event";
import {EventTypography} from "@components/common/event/EventTypography";

type FacilitatorInfoProps = {
  event: EventData,
}

const FacilitatorInfo: FC<FacilitatorInfoProps> = ({ event }) => {
  return (
    <>
      <EventTypography fontSize='h3' fontBold borderBottom gutterBottom text='About the Facilitator' />
      <Grid container>
        <Grid item xs={12} md={4}>
          <img src={event.coverImage} alt="Facilitator photo" />
        </Grid>
        <Grid item xs={12} md={8}>
          <EventTypography gutterBottom fontSize='body1' text={event.facilitatorName || "No facilitator name"} />
          <EventTypography gutterBottom fontSize='body1' text={event.facilitatorDescription || "No facilitator description."} />
        </Grid>
      </Grid>
    </>
  );
}

export default FacilitatorInfo;
