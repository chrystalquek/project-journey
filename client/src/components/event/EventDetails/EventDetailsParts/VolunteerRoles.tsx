import React, { FC } from 'react';
import { EventData, RoleData } from '@type/event';
import { Box } from '@material-ui/core';
import { EventTypography } from '@components/common/event/EventTypography';

type VolunteerRolesProps = {
  event: EventData
}

const VolunteerRoles: FC<VolunteerRolesProps> = ({ event }) => {
  const volunteerRoles = event.roles;

  return (
    <>
      <EventTypography gutterBottom borderBottom fontSize="h3" fontBold text="Volunteer Roles" />
      {volunteerRoles.length > 0
        ? volunteerRoles.map((role: RoleData) => (
            <Box marginBottom={3} key={role.name}>
              <EventTypography fontBold text={role.name} />
              <EventTypography text={role.description} />
            </Box>
          ))
        : <EventTypography text="No roles listed." />}
    </>
  );
};

export default VolunteerRoles;
