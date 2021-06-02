import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import ProfileDivider from '@components/common/ProfileDivider';
import DataRow from '@components/common/DataRow';
import PaddedGrid from '@components/common/PaddedGrid';
import { VolunteerData } from '@type/volunteer';

type props = {
  profilePageData: VolunteerData
}

const SignUpInformation: FC<props> = ({ profilePageData }) => {
  const birthday = new Date(profilePageData?.birthday).toLocaleDateString('en-US');
  const createdAt = new Date(profilePageData?.createdAt).toLocaleDateString('en-US');
  return (
    <PaddedGrid>
      <Grid item>
        <Typography variant="h4">Sign Up Information</Typography>
      </Grid>
      <Grid item>
        <ProfileDivider />
      </Grid>
      <DataRow header="Buddy" data={profilePageData.name} xs1={3} xs2={9} />
      <DataRow header="Date of birth" data={birthday} xs1={3} xs2={9} />
      <DataRow header="Volunteer reason" data={profilePageData.volunteerReason} xs1={3} xs2={9} />
      <DataRow header="Member since" data={createdAt} xs1={3} xs2={9} />
    </PaddedGrid>
  );
};

export default SignUpInformation;
