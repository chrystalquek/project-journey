import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import ProfileDivider from '@components/common/ProfileDivider';
import DataRow from '@components/common/DataRow';
import PaddedGrid from '@components/common/PaddedGrid';

export default function ContactInformation({ user }) {
  return (
    <PaddedGrid>
      <Grid item>
        <Typography variant="h4">Contact Information</Typography>
      </Grid>
      <Grid item>
        <ProfileDivider />
      </Grid>
      <DataRow header="Tel. No." data={user.contactNumber} xs1={3} xs2={9} />
      <DataRow header="E-mail" data={user.email} xs1={3} xs2={9} />
      <DataRow header="Lorem" data={user.lorem} xs1={3} xs2={9} />
    </PaddedGrid>
  );
}
