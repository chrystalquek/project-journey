import React, { FC } from "react";
import { EventData, RoleData } from "@type/event";
import { Grid, Typography } from "@material-ui/core";
import TypographyWithUnderline from "@components/common/data-display/TypographyWithUnderline";

type VolunteerRolesProps = {
  event: EventData;
};

const VolunteerRoles: FC<VolunteerRolesProps> = ({ event }) => {
  const volunteerRoles = event.roles;

  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <TypographyWithUnderline fontSize="h3" fontWeight="fontWeightBold">
          Volunteer Roles
        </TypographyWithUnderline>
      </Grid>
      {volunteerRoles.length > 0 ? (
        volunteerRoles.map((role: RoleData) => (
          <Grid item>
            <Typography style={{ fontWeight: "bold" }}>{role.name}</Typography>
            <Typography>{role.description}</Typography>
          </Grid>
        ))
      ) : (
        <Grid item>
          <Typography>No roles listed.</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default VolunteerRoles;
