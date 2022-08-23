import React, { FC } from "react";
import { Grid, Button, makeStyles, Typography } from "@material-ui/core";
import DataRow from "@components/common/DataRow";
import PaddedGrid from "@components/common/surfaces/PaddedGrid";
import { VolunteerData } from "@type/volunteer";
import { useRouter } from "next/router";
import TypographyWithUnderline from "@components/common/data-display/TypographyWithUnderline";

type props = {
  profilePageData: VolunteerData;
};

const useStyles = makeStyles(() => ({
  link: {
    cursor: "pointer",
  },
}));

const EventCount: FC<props> = ({ profilePageData }) => {
  const router = useRouter();
  const classes = useStyles();

  const handleViewPastEvents = () => {
    router.push("/event/my-past-events");
  };

  return (
    <PaddedGrid>
      <TypographyWithUnderline fontWeight="fontWeightMedium" fontSize="h3">
        Event Count
      </TypographyWithUnderline>
      <DataRow
        header="Volunteering Sessions"
        data={profilePageData.volunteeringSessionsCount?.toString()}
        xs1={11}
        xs2={1}
      />
      <DataRow
        header="Workshops"
        data={profilePageData.workshopsCount?.toString()}
        xs1={11}
        xs2={1}
      />
      <DataRow
        header="Hangouts"
        data={profilePageData.hangoutsCount?.toString()}
        xs1={11}
        xs2={1}
      />
      <Grid item>
        <Typography className={classes.link}>
          <Button color="secondary" onClick={handleViewPastEvents}>
            <u>View past events</u>
          </Button>
        </Typography>
      </Grid>
    </PaddedGrid>
  );
};

export default EventCount;
