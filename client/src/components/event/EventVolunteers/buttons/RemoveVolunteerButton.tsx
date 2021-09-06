import { ActionableDialog } from "@components/common/ActionableDialog";
import { SignUpData, SignUpIdType, SignUpStatus } from "@type/signUp";
import { useState } from "react";
import { useAppDispatch } from "@redux/store";
import { updateSignUp } from "@redux/actions/signUp";
import { getEvent } from "@redux/actions/event";

type RemoveVolunteerButtonProps = {
  signUp: SignUpData;
  volunteerName: string;
};

export const RemoveVolunteerButton = (props: RemoveVolunteerButtonProps) => {
  const { signUp, volunteerName } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useAppDispatch();

  const removeVolunteer = () => {
    const request = {
      data: { ...signUp, status: SignUpStatus.PENDING },
      id: signUp._id,
      idType: "signUpId" as SignUpIdType,
    };
    dispatch(updateSignUp(request));
    dispatch(getEvent(signUp.eventId));
  };

  return (
    <ActionableDialog
      open={isDialogOpen}
      setOpen={() => setIsDialogOpen(!isDialogOpen)}
      content={`Are you sure you want to remove ${volunteerName} as a volunteer?`}
      buttonOnClick={removeVolunteer}
      openCloseButtonStyle="popUpButton"
      openCloseButtonTitle="Remove Volunteer from Event"
      recommendedAction="cancel"
    />
  );
};
