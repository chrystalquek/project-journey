import React, { FC } from "react";
import { Grid, Typography } from "@material-ui/core";
import { EventData } from "@type/event";
import ResizedImage from "@components/common/image/ResizedImage";
import TypographyWithUnderline from "@components/common/data-display/TypographyWithUnderline";

type FacilitatorInfoProps = {
  event: EventData;
};

const FacilitatorInfo: FC<FacilitatorInfoProps> = ({ event }) => (
  <>
    <TypographyWithUnderline fontSize="h3" fontWeight="fontWeightBold">
      About the Facilitator
    </TypographyWithUnderline>
    <Grid container>
      <Grid item xs={12} md={4}>
        <ResizedImage img={event.coverImage} name="Facilitator" />
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography>
          {event.facilitatorName || "No facilitator name"}
        </Typography>
        <Typography>
          {event.facilitatorDescription || "No facilitator description."}
        </Typography>
      </Grid>
    </Grid>
  </>
);

export default FacilitatorInfo;
