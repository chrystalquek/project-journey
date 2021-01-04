import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import ProfileDivider from '@components/common/ProfileDivider';
import DataRow from '@components/common/DataRow';
import PaddedGrid from '@components/common/PaddedGrid';
import { makeStyles } from '@material-ui/core/styles';
import { VolunteerData } from '@type/volunteer';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.secondary.main,
  },
}));

type props = {
  user: VolunteerData
}

const EventCount: FC<props> = ({ user }) => {
  const classes = useStyles();

  return (
    <PaddedGrid>
      <Grid item>
        <Typography variant="h4">Event Count</Typography>
      </Grid>
      <Grid item>
        <ProfileDivider />
      </Grid>
      <DataRow header="Volunteering Sessions" data={user.volunteeringSessionsCount?.toString()} xs1={11} xs2={1} />
      <DataRow header="Workshops" data={user.workshopsCount?.toString()} xs1={11} xs2={1} />
      <DataRow header="Hangouts" data={user.hangoutsCount?.toString()} xs1={11} xs2={1} />
      <Grid item>
        <Typography className={classes.link}><u>View past events</u></Typography>
      </Grid>
    </PaddedGrid>
  );
};

export default EventCount;
