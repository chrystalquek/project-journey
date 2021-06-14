import React, { FC } from 'react';
import { EventData, RoleData } from '@type/event';
import { Grid } from '@material-ui/core';
import { EventTypography } from '@components/common/event/EventTypography';

type VolunteerRolesProps = {
  event: EventData
}

const VolunteerRoles: FC<VolunteerRolesProps> = ({ event }) => {
  const volunteerRoles = event.roles;

  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <EventTypography gutterBottom borderBottom fontSize="h3" fontBold text="Volunteer Roles" />
      </Grid>
      {volunteerRoles.length > 0
        ? volunteerRoles.map((role: RoleData) => (
          <Grid item>
            <EventTypography fontBold text={role.name} />
            <EventTypography text={role.description} />
          </Grid>
        ))
        : <Grid item><EventTypography text="No roles listed." /></Grid>}
    </Grid>
  );
};

export default VolunteerRoles;
