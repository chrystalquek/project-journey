import React, { FC, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import ProfileDivider from '@components/common/ProfileDivider';
import PaddedGrid from '@components/common/PaddedGrid';
import RemarksTextField from '@components/profile/RemarksTextField';
import { VolunteerData, VOLUNTEER_TYPE } from '@type/volunteer';
import { useDispatch } from 'react-redux';
import { updateVolunteerRemarks } from '@redux/actions/user';

type props = {
  user: VolunteerData
}
const Remarks: FC<props> = ({ user }) => {
  const dispatch = useDispatch();

  const [volunteerRemarks, setVolunteerRemarks] = useState<string>(user.volunteerRemarks);
  const [administratorRemarks, setAdministratorRemarks] = useState<string>(user.administratorRemarks);
  const [volunteerRemarksChanged, setVolunteerRemarksChanged] = useState<boolean>(false);
  const [administratorRemarksChanged, setAdministratorRemarksChanged] = useState<boolean>(false);

  const handleVolunteerRemarks = (event) => {
    setVolunteerRemarks(event.target.value);
    setVolunteerRemarksChanged(event.target.value !== user.volunteerRemarks);
  };

  const handleAdministratorRemarks = (event) => {
    setAdministratorRemarks(event.target.value);
    setAdministratorRemarksChanged(event.target.value !== user.administratorRemarks);
  };

  const saveVolunteerRemarks = () => {
    // TODO: sync database
    dispatch(
      updateVolunteerRemarks({
        email: user.email,
        volunteerRemarks,
      }),
    );

    user.volunteerRemarks = volunteerRemarks;
    setVolunteerRemarksChanged(false);
  };
  const saveAdministratorRemarks = () => {
    // TODO: sync database
    user.administratorRemarks = administratorRemarks;
    setAdministratorRemarksChanged(false);
  };

  const discardVolunteerRemarks = () => {
    setVolunteerRemarks(user.volunteerRemarks);
    setVolunteerRemarksChanged(false);
  };
  const discardAdministratorRemarks = () => {
    setAdministratorRemarks(user.administratorRemarks);
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

        {/* Admin remarks (only renders for admin) */}
        {user.volunteerType === VOLUNTEER_TYPE.ADMIN && (
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
