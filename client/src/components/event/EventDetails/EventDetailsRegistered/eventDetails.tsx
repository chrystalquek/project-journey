import { EventData } from '@type/event';
import React, { FC, useCallback, useEffect } from 'react';
import { VOLUNTEER_TYPE, VolunteerData } from '@type/volunteer';
import EventDetailsCommitted from '@components/event/EventDetails/EventDetailsRegistered/EventDetailsCommitted';
import EventDetailsAdhoc from '@components/event/EventDetails/EventDetailsRegistered/EventDetailsAdhoc';
import { FormState } from '@components/event/EventDetails/EventDetailsParts/EventRegisterForm';
import {
  createAndAcceptSignUp, createSignUp, deleteSignUp, getSignUps,
} from '@redux/actions/signUp';
import { useDispatch, useSelector } from 'react-redux';
import { CreateSignUpRequest } from '@utils/api/request';
import { FormDisabledReason, getFormData } from '@utils/helpers/event/EventDetails/EventDetails';
import { StoreState } from '@redux/store';
import { SignUpData, SignUpIdType } from '@type/signUp';
import { getEventVacancies } from '@utils/helpers/event/EventsPageBody';
import { ActionableDialog } from '@components/common/ActionableDialog';
import { useRouter } from 'next/router';
import { isAdmin } from '@utils/helpers/auth';
import { cancelEvent, deleteEvent } from '@redux/actions/event';
import { Button, makeStyles, Typography } from '@material-ui/core';

type EventDetailsProps = {
  event: EventData,
  user: VolunteerData
}

const useStyles = makeStyles((theme) => ({
  editButton: {
    borderRadius: '5em',
    textTransform: 'none',
    padding: theme.spacing(5),
    height: 30,
    marginRight: theme.spacing(5),
  },
  editButtonText: {
    color: 'black',
  },
}));

const EventDetails: FC<EventDetailsProps> = ({ event, user }) => {
  const dispatch = useDispatch();
  const currSignUps = useSelector((state: StoreState) => state.signUp.getSignUps.currSignUps);

  useEffect(() => {
    dispatch(getSignUps({ id: user._id, idType: 'userId' as SignUpIdType }));
  }, []);

  const signUpInfo: Array<SignUpData> = currSignUps.filter((signUp) => signUp.eventId === event._id);
  const isEventFull = getEventVacancies(event).remaining === 0;
  const hasPendingSignUp = signUpInfo.length > 0
    && signUpInfo[0].status === 'pending';
  const hasAcceptedSignUp = signUpInfo.length > 0
    && Array.isArray(signUpInfo[0].status)
    && signUpInfo[0].status[0] === 'accepted';

  let reason;
  if (isEventFull) {
    reason = FormDisabledReason.EVENT_FULL;
  } else if (hasPendingSignUp) {
    reason = FormDisabledReason.SIGNUP_PENDING;
  } else if (hasAcceptedSignUp) {
    reason = FormDisabledReason.SIGNUP_ACCEPTED;
  } else {
    reason = '';
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
        status: 'pending',
      };
      dispatch(createAndAcceptSignUp({ request, form })); // possibly check for failure
    },
    // volunteering events need admin approval
    signUpOnly: async (uid: string, eid: string, form: FormState) => {
      const request: CreateSignUpRequest = {
        ...getFormData(uid, eid, form),
        status: 'pending',
      };
      dispatch(createSignUp(request));
    },
  };

  const renderDetails = (volunteerType: VOLUNTEER_TYPE): React.ReactNode => {
    switch (volunteerType) {
      case VOLUNTEER_TYPE.ADHOC:
        // adhoc volunteers can't register for events opened to committed volunteers
        formStatus.disabled = event.volunteerType
          === VOLUNTEER_TYPE.COMMITED || formStatus.disabled;
        return (
          <EventDetailsAdhoc
            formStatus={formStatus}
            formHandlers={formHandlers}
            event={event}
            user={user}
          />
        );
      case VOLUNTEER_TYPE.COMMITED:
      case VOLUNTEER_TYPE.ADMIN:
        return (
          <EventDetailsCommitted
            formStatus={formStatus}
            formHandlers={formHandlers}
            event={event}
            user={user}
          />
        );
      default:
        // this path shouldn't be reached
        return <></>;
    }
  };

  const classes = useStyles();
  const router = useRouter();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = React.useState<boolean>(false);
  const [isCancelDeleteModalOpen, setIsCancelDeleteModalOpen] = React.useState<boolean>(false);

  const withdrawCommitment = () => {
    const acceptedSignUp = signUpInfo.find((signUp) => Array.isArray(signUp.status) && signUp.status[0] === 'accepted');
    dispatch(deleteSignUp({
      id: acceptedSignUp.signUpId, idType: 'signUpId', eventId: acceptedSignUp.eventId, userId: acceptedSignUp.userId,
    }));
    router.push('/event');
  };

  const handleCancelEvent = useCallback(() => {
    dispatch(cancelEvent({ eventId: event._id }));
    setIsCancelDeleteModalOpen(false);
    router.push('/event');
  }, [event]);

  const handleDeleteEvent = useCallback(() => {
    dispatch(deleteEvent({ eventId: event._id }));
    setIsCancelDeleteModalOpen(false);
    router.push('/event');
  }, [event]);

  const withdrawCommitmentQuestion = (
    <>
      Are you sure you want to withdraw from
      <b>
        {event.name}
        ?
      </b>
      <br />
      <br />
      Withdrawal from event cannot be undone.
    </>
  );

  const DeleteEventContent = (
    <>
      Are you sure you want to delete
      <br />
      <b>
        {event.name}
      </b>
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
      <b>
        {event.name}
      </b>
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
        openCloseButtonTitle="Delete"
        recommendedAction="cancel"
      />
    ) : (
      <ActionableDialog
        open={isCancelDeleteModalOpen}
        setOpen={() => setIsCancelDeleteModalOpen(!isCancelDeleteModalOpen)}
        content={CancelEventContent}
        buttonTitle="Confirm"
        buttonOnClick={handleCancelEvent}
        openCloseButtonTitle="Cancel"
        recommendedAction="cancel"
      />
    )
  ) : (
    <>
    </>
  );

  const EditButton = isAdmin(user) ? (
    <Button
      variant="contained"
      type="submit"
      color="primary"
      onClick={() => router.push(`/form/${event._id}`)}
      className={classes.editButton}
    >
      <Typography
        variant="body1"
        className={classes.editButtonText}
      >
        EDIT
      </Typography>
    </Button>
  ) : <></>;

  return (
    <>
      {renderDetails(user.volunteerType)}
      {EditButton}
      {hasAcceptedSignUp && (
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
