import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import ProfileDivider from '@components/common/ProfileDivider';
import DataRow from '@components/common/DataRow';
import PaddedGrid from '@components/common/PaddedGrid';

export default function SignUpInformation({ user }) {
  return (
    <PaddedGrid>
      <Grid item>
        <Typography variant="h4">Sign Up Information</Typography>
      </Grid>
      <Grid item>
        <ProfileDivider />
      </Grid>
      <DataRow header="Buddy" data={user.buddy} xs1={3} xs2={9} />
      <DataRow header="Date of birth" data={user.birthDate} xs1={3} xs2={9} />
      <DataRow header="Lorem" data={user.lorem} xs1={3} xs2={9} />
      <DataRow header="Lorem ipsum" data={user.loremIpsum} xs1={3} xs2={9} />
      <DataRow header="Member since" data={user.memberSince} xs1={3} xs2={9} />
    </PaddedGrid>
  );
}
