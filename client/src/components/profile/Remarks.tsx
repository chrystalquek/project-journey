import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import ProfileDivider from '@components/common/ProfileDivider';
import PaddedGrid from '@components/common/PaddedGrid';
import RemarksTextField from '@components/profile/RemarksTextField';

export default function Remarks({ user }) {
  const [volunteerRemarks, setVolunteerRemarks] = useState<string>(user.volunteerRemarks);
  const [adminRemarks, setAdminRemarks] = useState<string>(user.adminRemarks);
  const [volunteerRemarksChanged, setVolunteerRemarksChanged] = useState<boolean>(false);
  const [adminRemarksChanged, setAdminRemarksChanged] = useState<boolean>(false);

  const handleVolunteerRemarks = (event) => {
    setVolunteerRemarks(event.target.value);
    setVolunteerRemarksChanged(event.target.value !== user.volunteerRemarks);
  };

  const handleAdminRemarks = (event) => {
    setAdminRemarks(event.target.value);
    setAdminRemarksChanged(event.target.value !== user.adminRemarks);
  };

  const saveVolunteerRemarks = () => {
    // TODO: sync database
    user.volunteerRemarks = volunteerRemarks;
    setVolunteerRemarksChanged(false);
  };
  const saveAdminRemarks = () => {
    // TODO: sync database
    user.adminRemarks = adminRemarks;
    setAdminRemarksChanged(false);
  };

  const discardVolunteerRemarks = () => {
    setVolunteerRemarks(user.volunteerRemarks);
    setVolunteerRemarksChanged(false);
  };
  const discardAdminRemarks = () => {
    setAdminRemarks(user.adminRemarks);
    setAdminRemarksChanged(false);
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
        {user.status === 'admin'
          ? (
            <RemarksTextField
              value={adminRemarks}
              onChange={handleAdminRemarks}
              label="Notes on volunteer"
              show={adminRemarksChanged}
              onSave={saveAdminRemarks}
              onDiscard={discardAdminRemarks}
            />
          )
          : null}
      </Grid>
    </PaddedGrid>
  );
}
