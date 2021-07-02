import React, { FC } from "react";
import { Box, Grid } from "@material-ui/core";
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
      <Box fontWeight="fontWeightMedium" fontSize="h3.fontSize">
        Contact Information
      </Box>
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
