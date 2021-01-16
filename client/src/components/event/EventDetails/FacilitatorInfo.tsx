import React, { FC } from 'react';
import { Box, Grid } from '@material-ui/core';
import { EventData } from '@type/event';
import CreateAccountNotice from '@components/event/EventDetails/CreateAccountNotice';

type FacilitatorInfoProps = {
  event: EventData,
}

const FacilitatorInfo: FC<FacilitatorInfoProps> = ({ event }) => (
  <>
    <Box fontWeight="bold" fontSize="h3.fontSize">
      About the Facilitator
    </Box>
    <Grid container>
      <Grid item xs={12} md={4}>
        <img src={event.coverImage} alt="Facilitator photo" />
      </Grid>
      <Grid item xs={12} md={8}>
        <p>{event.facilitatorName ? event.facilitatorName : 'No facilitator name'}</p>
        <p>{event.facilitatorDescription ? event.facilitatorDescription : 'No facilitator description.'}</p>
      </Grid>
    </Grid>
  </>
);

export default FacilitatorInfo;
