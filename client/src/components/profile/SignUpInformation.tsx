import React, { FC } from "react";
import DataRow from "@components/common/DataRow";
import PaddedGrid from "@components/common/surfaces/PaddedGrid";
import { VolunteerData } from "@type/volunteer";
import TypographyWithUnderline from "@components/common/data-display/TypographyWithUnderline";

type props = {
  profilePageData: VolunteerData;
};

const SignUpInformation: FC<props> = ({ profilePageData }) => {
  const birthday = new Date(profilePageData?.birthday).toLocaleDateString(
    "en-US"
  );
  const createdAt = new Date(profilePageData?.createdAt).toLocaleDateString(
    "en-US"
  );
  return (
    <PaddedGrid>
      <TypographyWithUnderline fontWeight="fontWeightMedium" fontSize="h3">
        Sign Up Information
      </TypographyWithUnderline>
      <DataRow header="Buddy" data={profilePageData.name} xs1={3} xs2={9} />
      <DataRow header="Date of birth" data={birthday} xs1={3} xs2={9} />
      <DataRow
        header="Volunteer reason"
        data={profilePageData.volunteerReason}
        xs1={3}
        xs2={9}
      />
      <DataRow header="Member since" data={createdAt} xs1={3} xs2={9} />
    </PaddedGrid>
  );
};

export default SignUpInformation;
