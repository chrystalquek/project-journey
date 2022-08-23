import { IconButton, Popover, Grid } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useState } from "react";
import { SignUpData } from "@type/signUp";
import { RemoveVolunteerButton } from "./RemoveVolunteerButton";
import { EditVolunteerRoleButton } from "./EditRoleButton";

type MoreButtonProps = {
  signUp: SignUpData;
  volunteerName: string;
  roleVacancies: {
    [role: string]: number;
  };
};

export const MoreButton = (props: MoreButtonProps) => {
  const { signUp, roleVacancies, volunteerName } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon color="primary" />
      </IconButton>
      <Popover
        id={signUp?._id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <Grid>
          <RemoveVolunteerButton
            signUp={signUp}
            volunteerName={volunteerName}
          />
          <EditVolunteerRoleButton
            signUp={signUp}
            volunteerName={volunteerName}
            roleVacancies={roleVacancies}
          />
        </Grid>
      </Popover>
    </>
  );
};
