import { EventData } from "@type/event";
import React, { FC, useCallback, useEffect } from "react";
import { VolunteerType, VolunteerData } from "@type/volunteer";
import EventDetailsCommitted from "@components/event/EventDetails/EventDetailsRegistered/EventDetailsCommitted";
import EventDetailsAdhoc from "@components/event/EventDetails/EventDetailsRegistered/EventDetailsAdhoc";
import { FormState } from "@components/event/EventDetails/EventDetailsParts/EventRegisterForm";
import {
  createAndAcceptSignUp,
  createSignUp,
  deleteSignUp,
  getSignUps,
} from "@redux/actions/signUp";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { CreateSignUpRequest } from "@api/request";
import {
  FormDisabledReason,
  getFormData,
} from "@components/event/helpers/EventDetails/EventDetails";
import { SignUpData, SignUpIdType, SignUpStatus } from "@type/signUp";
import { getEventVacancies } from "@components/event/helpers/EventsPageBody";
import { ActionableDialog } from "@components/common/ActionableDialog";
import { useRouter } from "next/router";
import { isAdmin } from "@utils/helpers/auth";
import { cancelEvent, deleteEvent } from "@redux/actions/event";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { EDIT_EVENT_FORM_ROUTE } from "@constants/routes";

type EventDetailsProps = {
  event: EventData;
  user: VolunteerData;
};

const useStyles = makeStyles((theme) => ({
  editButton: {
    borderRadius: "5em",
    textTransform: "none",
    padding: theme.spacing(5),
    height: 30,
    marginRight: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
  editButtonText: {
    color: theme.palette.common.black,
  },
}));

const EventDetails: FC<EventDetailsProps> = ({ event, user }) => {
  const dispatch = useAppDispatch();
  const currSignUps = useAppSelector(
    (state) => state.signUp.getSignUps.currSignUps
  );

  useEffect(() => {
    dispatch(getSignUps({ id: user._id, idType: "userId" as SignUpIdType }));
  }, []);

  const signUpInfo: Array<SignUpData> = currSignUps.filter(
    (signUp) => signUp.eventId === event._id
  );
  const isEventFull = getEventVacancies(event).remaining === 0;
  const hasPendingSignUp =
    signUpInfo.length > 0 && signUpInfo[0].status === SignUpStatus.PENDING;
  const hasAcceptedSignUp =
    signUpInfo.length > 0 && signUpInfo[0].status === SignUpStatus.ACCEPTED;

  let reason;
  if (isEventFull) {
    reason = FormDisabledReason.EVENT_FULL;
  } else if (hasPendingSignUp) {
    reason = FormDisabledReason.SIGNUP_PENDING;
  } else if (hasAcceptedSignUp) {
    reason = FormDisabledReason.SIGNUP_ACCEPTED;
  } else {
    reason = "";
  }

  // For signup form disabling logic, etc
  const formStatus = {
    disabled: isEventFull || hasPendingSignUp || hasAcceptedSignUp, // default disabled reasons
    reason,
    details: {
      acceptedSignUp: hasAcceptedSignUp ? signUpInfo[0] : null,
    },
  };

  const formHandlers = {
    // non-volunteering events don't need admin approval
    signUpAndAccept: async (uid: string, eid: string, form: FormState) => {
      const request: CreateSignUpRequest = {
        ...getFormData(uid, eid, form),
        status: SignUpStatus.PENDING,
      };
      dispatch(createAndAcceptSignUp({ request, form })); // possibly check for failure
    },
    // volunteering events need admin approval
    signUpOnly: async (uid: string, eid: string, form: FormState) => {
      const request: CreateSignUpRequest = {
        ...getFormData(uid, eid, form),
        status: SignUpStatus.PENDING,
      };
      dispatch(createSignUp(request));
    },
  };

  const renderDetails = (volunteerType: VolunteerType): React.ReactNode => {
    switch (volunteerType) {
      case VolunteerType.ADHOC:
        // adhoc volunteers can't register for events opened to committed volunteers
        formStatus.disabled =
          event.volunteerType === VolunteerType.COMMITTED ||
          formStatus.disabled;
        return (
          <EventDetailsAdhoc
            formStatus={formStatus}
            formHandlers={formHandlers}
            event={event}
            user={user}
          />
        );
      case VolunteerType.COMMITTED:
        return (
          <EventDetailsCommitted
            formStatus={formStatus}
            formHandlers={formHandlers}
            event={event}
            user={user}
          />
        );
      case VolunteerType.ADMIN:
        return (
          <>
            <EventDetailsCommitted
              formStatus={formStatus}
              formHandlers={formHandlers}
              event={event}
              user={user}
            />
          </>
        );
      default:
        // this path shouldn't be reached
        return <></>;
    }
  };

  const classes = useStyles();
  const router = useRouter();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] =
    React.useState<boolean>(false);
  const [isCancelDeleteModalOpen, setIsCancelDeleteModalOpen] =
    React.useState<boolean>(false);

  const withdrawCommitment = () => {
    const acceptedSignUp = signUpInfo.find(
      (signUp) => signUp.status === SignUpStatus.ACCEPTED
    );
    dispatch(
      deleteSignUp({
        id: acceptedSignUp._id,
        idType: "signUpId",
      })
    );
    router.push("/event");
  };

  const handleCancelEvent = useCallback(() => {
    dispatch(cancelEvent(event._id));
    setIsCancelDeleteModalOpen(false);
    router.push("/event");
  }, [event]);

  const handleDeleteEvent = useCallback(() => {
    dispatch(deleteEvent(event._id));
    setIsCancelDeleteModalOpen(false);
    router.push("/event");
  }, [event]);

  const withdrawCommitmentQuestion = (
    <>
      Are you sure you want to withdraw from
      <b>{event.name}?</b>
      <br />
      <br />
      Withdrawal from event cannot be undone.
    </>
  );

  const DeleteEventContent = (
    <>
      Are you sure you want to delete
      <br />
      <b>{event.name}</b>
      <br />
      <br />
      <br />
      Deletion of event cannot be undone.
    </>
  );

  const CancelEventContent = (
    <>
      Are you sure you want to cancel
      <br />
      <b>{event.name}</b>
      <br />
      <br />
      <br />
      Cancellation of event cannot be undone.
    </>
  );

  // eslint-disable-next-line no-nested-ternary
  const CancelDeleteButton = isAdmin(user) ? (
    getEventVacancies(event).filled === 0 ? (
      <ActionableDialog
        open={isCancelDeleteModalOpen}
        setOpen={() => setIsCancelDeleteModalOpen(!isCancelDeleteModalOpen)}
        content={DeleteEventContent}
        buttonTitle="Confirm"
        buttonOnClick={handleDeleteEvent}
        openCloseButtonTitle="Delete Event"
        recommendedAction="cancel"
      />
    ) : (
      <ActionableDialog
        open={isCancelDeleteModalOpen}
        setOpen={() => setIsCancelDeleteModalOpen(!isCancelDeleteModalOpen)}
        content={CancelEventContent}
        buttonTitle="Confirm"
        buttonOnClick={handleCancelEvent}
        openCloseButtonTitle="Cancel Event"
        recommendedAction="cancel"
      />
    )
  ) : (
    <></>
  );

  const EditButton = isAdmin(user) ? (
    <Button
      variant="contained"
      type="submit"
      color="primary"
      onClick={() => router.push(EDIT_EVENT_FORM_ROUTE(event._id))}
      className={classes.editButton}
    >
      <Typography variant="body1" className={classes.editButtonText}>
        Edit Event
      </Typography>
    </Button>
  ) : (
    <></>
  );

  return (
    <>
      {renderDetails(user.volunteerType)}
      {EditButton}
      {user.volunteerType !== VolunteerType.ADMIN && hasAcceptedSignUp && (
        <ActionableDialog
          open={isWithdrawModalOpen}
          setOpen={() => setIsWithdrawModalOpen(!isWithdrawModalOpen)}
          content={withdrawCommitmentQuestion}
          buttonTitle="Confirm"
          buttonOnClick={withdrawCommitment}
          openCloseButtonTitle="Withdraw"
          recommendedAction="cancel"
        />
      )}
      {CancelDeleteButton}
    </>
  );
};

export default EventDetails;
