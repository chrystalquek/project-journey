import React, { FC } from "react";
import DataRow from "@components/common/DataRow";
import PaddedGrid from "@components/common/surfaces/PaddedGrid";
import { VolunteerData } from "@type/volunteer";
import TypographyWithUnderline from "@components/common/data-display/TypographyWithUnderline";

type props = {
  profilePageData: VolunteerData;
};

const ContactInformation: FC<props> = ({ profilePageData }) => (
  <PaddedGrid>
    <TypographyWithUnderline fontWeight="fontWeightMedium" fontSize="h3">
      Contact Information
    </TypographyWithUnderline>
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
