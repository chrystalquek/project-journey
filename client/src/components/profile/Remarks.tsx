import React, { FC, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import ProfileDivider from '@components/common/ProfileDivider';
import PaddedGrid from '@components/common/PaddedGrid';
import RemarksTextField from '@components/profile/RemarksTextField';
import { VolunteerData, VOLUNTEER_TYPE } from '@type/volunteer';
import { useDispatch, useSelector } from 'react-redux';
import { updateVolunteer } from '@redux/actions/user';
import { StoreState } from '@redux/store';

type props = {
  profilePageData: VolunteerData
}

const Remarks: FC<props> = ({ profilePageData }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: StoreState) => state.user);
  const userData = user.user

  let originalVolunteerRemarks = profilePageData.volunteerRemarks;
  const originalAdministratorRemarks = profilePageData.administratorRemarks;

  const [volunteerRemarks, setVolunteerRemarks] = useState<string>(originalVolunteerRemarks);
  const [administratorRemarks, setAdministratorRemarks] = useState<string>(originalAdministratorRemarks);
  const [volunteerRemarksChanged, setVolunteerRemarksChanged] = useState<boolean>(false);
  const [administratorRemarksChanged, setAdministratorRemarksChanged] = useState<boolean>(false);

  const handleVolunteerRemarks = (event) => {
    setVolunteerRemarks(event.target.value);
    setVolunteerRemarksChanged(event.target.value !== originalVolunteerRemarks);
  };

  const handleAdministratorRemarks = (event) => {
    setAdministratorRemarks(event.target.value);
    setAdministratorRemarksChanged(event.target.value !== originalAdministratorRemarks);
  };

  const saveVolunteerRemarks = () => {
    // TODO: sync database
    dispatch(
      updateVolunteer({
        email: profilePageData.email,
        updatedVolunteerData: {
          volunteerRemarks,
        },
      }),
    );

    originalVolunteerRemarks = volunteerRemarks;
    setVolunteerRemarksChanged(false);
  };
  const saveAdministratorRemarks = () => {
    // TODO: sync database
    profilePageData.administratorRemarks = administratorRemarks;
    setAdministratorRemarksChanged(false);
  };

  const discardVolunteerRemarks = () => {
    setVolunteerRemarks(profilePageData.volunteerRemarks);
    setVolunteerRemarksChanged(false);
  };
  const discardAdministratorRemarks = () => {
    setAdministratorRemarks(profilePageData.administratorRemarks);
    setAdministratorRemarksChanged(false);
  };

  return (
    <PaddedGrid>
      <Grid item>
        <Typography variant="h4">Remarks</Typography>
      </Grid>
      <Grid item>
        <ProfileDivider />
      </Grid>
      <Grid item container direction="column" spacing={2}>

        {/* Volunteer remarks */}
        <RemarksTextField
          value={volunteerRemarks}
          onChange={handleVolunteerRemarks}
          label="Notes for Admin"
          show={volunteerRemarksChanged}
          onSave={saveVolunteerRemarks}
          onDiscard={discardVolunteerRemarks}
        />

        {/* Admin remarks not rendered if the profilePageData is admin 
        and only shows the admin remarks if the user is admin*/}
        {profilePageData.volunteerType !== VOLUNTEER_TYPE.ADMIN &&
        userData.volunteerType === VOLUNTEER_TYPE.ADMIN && (
        <RemarksTextField
          value={administratorRemarks}
          onChange={handleAdministratorRemarks}
          label="Notes on volunteer"
          show={administratorRemarksChanged}
          onSave={saveAdministratorRemarks}
          onDiscard={discardAdministratorRemarks}
        />
        )}
      </Grid>
    </PaddedGrid>
  );
};

export default Remarks;
