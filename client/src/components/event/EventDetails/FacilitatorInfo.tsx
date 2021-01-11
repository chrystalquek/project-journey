import React, {FC} from "react";
import {Box, Grid} from "@material-ui/core";
import {EventData} from "@type/event";
import CreateAccountNotice from "@components/event/EventDetails/CreateAccountNotice";
import {EventHeader} from "@components/common/event/EventHeader";

type FacilitatorInfoProps = {
  event: EventData,
}

const FacilitatorInfo: FC<FacilitatorInfoProps> = ({ event }) => {
  return (
    <>
      <EventHeader fontBold borderBottom gutterBottom text='About the Facilitator' />
      <Grid container>
        <Grid item xs={12} md={4}>
          <img src={event.coverImage} alt="Facilitator photo" />
        </Grid>
        <Grid item xs={12} md={8}>
          <p>{event.facilitatorName ? event.facilitatorName : "No facilitator name"}</p>
          <p>{event.facilitatorDescription ? event.facilitatorDescription : "No facilitator description."}</p>
        </Grid>
      </Grid>
    </>
  );
}

export default FacilitatorInfo;
