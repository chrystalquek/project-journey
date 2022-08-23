import React, { FC } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { EventData } from "@type/event";
import TypographyWithUnderline from "@components/common/data-display/TypographyWithUnderline";

type FacilitatorInfoProps = {
  event: EventData;
};

const useStyles = makeStyles({
  coverImage: {
    width: "100%",
    height: "auto",
  },
});

// TODO(aloy): Fix this component.
const FacilitatorInfo: FC<FacilitatorInfoProps> = ({ event }) => {
  const classes = useStyles();

  return (
    <>
      <TypographyWithUnderline fontSize="h3" fontWeight="fontWeightBold">
        About the Facilitator
      </TypographyWithUnderline>
      <Grid container>
        <Grid item xs={12} md={4}>
          <img
            className={classes.coverImage}
            src="https://picsum.photos/200"
            alt="Facilitator"
          />
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
};

export default FacilitatorInfo;
