import { Grid, Typography } from "@material-ui/core";
import { ActionableDialog } from "@components/common/ActionableDialog";
import { SignUpData, SignUpIdType, SignUpStatus } from "@type/signUp";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { updateSignUp } from "@redux/actions/signUp";
import { useSnackbar } from "notistack";
import { RoleSelectMenu } from "../select/RoleSelectMenu";

type EditRoleButtonProps = {
  signUp: SignUpData;
  volunteerName: string;
  roleVacancies: {
    [role: string]: number;
  };
};

export const EditVolunteerRoleButton = (props: EditRoleButtonProps) => {
  const { signUp, volunteerName, roleVacancies } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const defaultRoleValue =
    signUp && signUp.status === SignUpStatus.ACCEPTED && signUp.acceptedRole
      ? signUp.acceptedRole
      : "Role";
  const [selectedRole, setSelectedRole] = useState(defaultRoleValue);
  const dispatch = useAppDispatch();
  const volunteerFetchStatus = useAppSelector(
    (state) => state.volunteer.status
  );
  const { enqueueSnackbar } = useSnackbar();

  const getDialogContent = () => (
    <Grid container spacing={4} direction="column">
      <Grid item>
        <Typography align="center">{`Edit ${volunteerName}'s role.`}</Typography>
      </Grid>
      <Grid item>
        <RoleSelectMenu
          signUp={signUp}
          roleVacancies={roleVacancies}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      </Grid>
    </Grid>
  );

  const request = {
    data: {
      ...signUp,
      status: SignUpStatus.ACCEPTED,
      acceptedRole: selectedRole,
    },
    id: signUp._id,
    idType: "signUpId" as SignUpIdType,
  };

  const editVolunteerRole = () => {
    dispatch(updateSignUp(request));
    if (volunteerFetchStatus === "rejected") {
      enqueueSnackbar("Volunteer role change failed.", {
        variant: "error",
      });
    } else if (volunteerFetchStatus === "fulfilled") {
      enqueueSnackbar("Successfully Changed Volunteer Role!", {
        variant: "success",
      });
    }
  };

  return (
    <ActionableDialog
      open={isDialogOpen}
      setOpen={() => setIsDialogOpen(!isDialogOpen)}
      content={getDialogContent()}
      buttonOnClick={editVolunteerRole}
      openCloseButtonStyle="popUpButton"
      openCloseButtonTitle="Edit Volunteer Role"
      recommendedAction="cancel"
    />
  );
};
