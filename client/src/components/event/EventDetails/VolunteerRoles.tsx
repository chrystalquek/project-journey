import React, {FC} from "react";
import {EventData, VolunteerRole} from "@type/event";
import {Box} from "@material-ui/core";

type VolunteerRolesProps = {
  event: EventData
}

const VolunteerRoles: FC<VolunteerRolesProps> = ({ event }) => {
  const volunteerRoles = event.roles;

  return (
    <>
      <Box fontWeight="bold" fontSize="h3.fontSize">
        Volunteer Roles
      </Box>
      {volunteerRoles.map((role: VolunteerRole) => (
        <div key={role.name}>
          <div><strong>{role.name}</strong></div>
          <p>{role.description}</p>
        </div>
      ))}
    </>
  )
}

export default VolunteerRoles;