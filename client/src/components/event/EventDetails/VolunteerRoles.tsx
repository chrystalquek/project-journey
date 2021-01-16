import React, { FC } from 'react';
import { EventData, RoleData } from '@type/event';
import { Box } from '@material-ui/core';
import {EventTypography} from "@components/common/event/EventTypography";

type VolunteerRolesProps = {
  event: EventData
}

const VolunteerRoles: FC<VolunteerRolesProps> = ({ event }) => {
  const volunteerRoles = event.roles;

  return (
    <>
      <EventTypography gutterBottom borderBottom fontSize="h3" fontBold text="Volunteer Roles" />
      {volunteerRoles.map((role: RoleData) => (
        <Box marginBottom={3} key={role.name}>
          <EventTypography fontBold text={role.name} />
          <EventTypography text={role.description} />
        </Box>
      ))}
    </>
  );
};

export default VolunteerRoles;
