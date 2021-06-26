import React, { FC } from "react";
import { Grid, Typography } from "@material-ui/core";
import ProfileDivider from "@components/common/ProfileDivider";
import DataRow from "@components/common/DataRow";
import PaddedGrid from "@components/common/PaddedGrid";
import { VolunteerData } from "@type/volunteer";

type props = {
  profilePageData: VolunteerData;
};

const ContactInformation: FC<props> = ({ profilePageData }) => (
  <PaddedGrid>
    <Grid item>
      <Typography variant="h4">Contact Information</Typography>
    </Grid>
    <Grid item>
      <ProfileDivider />
    </Grid>
    <DataRow
      header="Tel. No."
      data={profilePageData.mobileNumber}
      xs1={3}
      xs2={9}
    />
    <DataRow header="E-mail" data={profilePageData.email} xs1={3} xs2={9} />
  </PaddedGrid>
);

export default ContactInformation;
