import React, { FC } from "react";
import DataRow from "@components/common/DataRow";
import PaddedGrid from "@components/common/surfaces/PaddedGrid";
import { VolunteerData } from "@type/volunteer";
import TypographyWithUnderline from "@components/common/data-display/TypographyWithUnderline";

type Props = {
  profileData: VolunteerData;
};

const SignUpInformation: FC<Props> = ({ profileData }) => {
  const birthday = new Date(profileData?.birthday ?? 0).toLocaleDateString(
    "en-US"
  );
  const createdAt = new Date(profileData.createdAt).toLocaleDateString("en-US");
  return (
    <PaddedGrid>
      <TypographyWithUnderline fontWeight="fontWeightMedium" fontSize="h3">
        Sign Up Information
      </TypographyWithUnderline>
      <DataRow header="Buddy" data={profileData.name} xs1={3} xs2={9} />
      <DataRow header="Date of birth" data={birthday} xs1={3} xs2={9} />
      <DataRow
        header="Volunteer reason"
        data={profileData.volunteerReason}
        xs1={3}
        xs2={9}
      />
      <DataRow header="Member since" data={createdAt} xs1={3} xs2={9} />
    </PaddedGrid>
  );
};

export default SignUpInformation;
