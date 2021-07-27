import { ActionableDialog } from "@components/common/ActionableDialog";
import ResizedImage from "@components/common/image/ResizedImage";
import LoadingIndicator from "@components/common/LoadingIndicator";
import {
  ALL_VOLUNTEERS_TAG,
  COMMITTED_VOLUNTEER_TAG,
} from "@components/event/index";
import BecomeCommitedDialog from "@components/profile/BecomeCommitedDialog";
import { EDIT_EVENT_FORM_ROUTE } from "@constants/routes";
import {
  Button,
  Chip,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { cancelEvent, deleteEvent, getEvent } from "@redux/actions/event";
import { deleteSignUp } from "@redux/actions/signUp";
import { useAppDispatch, useAppSelector } from "@redux/store";
import theme from "@styles/theme";
import { EventType } from "@type/event";
import { SignUpStatus } from "@type/signUp";
import { VolunteerType } from "@type/volunteer";
import { isAdmin } from "@utils/helpers/auth";
import { useIsMobile } from "@utils/helpers/layout";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import EventBreadCrumbs from "./EventBreadCrumbs";
import CreateAccountNotice from "./EventDetails/CreateAccountNotice";
import EventInformation from "./EventDetails/EventInformation";
import EventRegisterForm from "./EventDetails/EventRegisterForm";
import FacilitatorInfo from "./EventDetails/FacilitatorInfo";
import SideNav from "./EventDetails/SideNav";
import SignUpStatusBox from "./EventDetails/SignUpStatusBox";
import VolunteerRoles from "./EventDetails/VolunteerRoles";
import { FormDisabledReason } from "./helpers/EventDetails/EventDetails";
import { getEventVacancies } from "./helpers/EventsPageBody";

type Props = {
  eid: string;
};

const useStyles = makeStyles({
  coverImage: {
    width: "100%",
    height: "auto",
  },
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
});

const EventDetails = ({ eid }: Props) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const router = useRouter();

  const user = useAppSelector((state) => state.user.user);
  const event = useAppSelector((state) => state.event.event.form);

  const isMobile = useIsMobile();
  const isLoggedIn = !!user;

  // TODO (aloy): Move this business logic to backend.
  const userCanApplyToEvent =
    user.volunteerType === VolunteerType.COMMITTED ||
    (user.volunteerType === VolunteerType.ADHOC &&
      event.volunteerType === VolunteerType.ADHOC);

  useEffect(() => {
    dispatch(getEvent(eid));
  }, [dispatch, eid]);

  // ========================
  // TODO (aloy): Simplify this.
  const currSignUps = useAppSelector(
    (state) => state.signUp.getSignUps.currSignUps
  );

  const [formStatus, hasAcceptedSignUp] = useMemo(() => {
    const signUpInfo = currSignUps.filter(
      (signUp) => signUp.eventId === event._id
    );
    const isEventFull = getEventVacancies(event).remaining === 0;
    const hasPendingSignUp =
      signUpInfo.length > 0 && signUpInfo[0].status === SignUpStatus.PENDING;
    const innerHasAcceptedSignUp =
      signUpInfo.length > 0 && signUpInfo[0].status === SignUpStatus.ACCEPTED;

    let reason;
    if (isEventFull) {
      reason = FormDisabledReason.EVENT_FULL;
    } else if (hasPendingSignUp) {
      reason = FormDisabledReason.SIGNUP_PENDING;
    } else if (innerHasAcceptedSignUp) {
      reason = FormDisabledReason.SIGNUP_ACCEPTED;
    } else {
      reason = "";
    }

    // For signup form disabling logic, etc
    return [
      {
        disabled: isEventFull || hasPendingSignUp || innerHasAcceptedSignUp, // default disabled reasons
        reason,
        details: {
          acceptedSignUp: innerHasAcceptedSignUp ? signUpInfo[0] : null,
        },
      },
      innerHasAcceptedSignUp,
    ];
  }, [currSignUps, event]);
  // =========================

  // =========================
  // TODO (aloy): Simplify this.
  const hasSignUps = getEventVacancies(event).filled === 0;
  const [isCancelDeleteModalOpen, setIsCancelDeleteModalOpen] = useState(false);
  const renderDeleteEventContent = useCallback(
    () => (
      <>
        Are you sure you want to delete
        <br />
        <b>{event.name}</b>
        <br />
        <br />
        <br />
        Deletion of event cannot be undone.
      </>
    ),
    [event]
  );

  const renderCancelEventContent = useCallback(
    () => (
      <>
        Are you sure you want to cancel
        <br />
        <b>{event.name}</b>
        <br />
        <br />
        <br />
        Cancellation of event cannot be undone.
      </>
    ),
    [event]
  );
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
  // =========================

  // =========================
  // TODO (aloy): Simplify this.
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const withdrawCommitment = () => {
    const signUpInfo = currSignUps.filter(
      (signUp) => signUp.eventId === event._id
    );
    const acceptedSignUp = signUpInfo.find(
      (signUp) =>
        Array.isArray(signUp.status) && signUp.status[0] === "accepted"
    );
    dispatch(
      deleteSignUp({
        id: acceptedSignUp._id,
        idType: "signUpId",
      })
    );
    router.push("/event");
  };
  const renderWithdrawCommitmentQuestion = useCallback(
    () => (
      <>
        Are you sure you want to withdraw from
        <b>{event.name}?</b>
        <br />
        <br />
        Withdrawal from event cannot be undone.
      </>
    ),
    [event]
  );
  // =========================

  if (!event) {
    return <LoadingIndicator />;
  }

  return (
    <Container>
      <Grid container direction="row" wrap="nowrap">
        {/* Desktop - Side Navigation */}
        {!isMobile && (
          <Grid item xs={1}>
            <SideNav selected="details" eventId={event._id} />
          </Grid>
        )}

        <Grid item container xs={12} md={10} spacing={8}>
          <Grid item xs={12}>
            <EventBreadCrumbs eid={event._id} />
          </Grid>

          {/* Event Title */}
          <Grid item xs={12}>
            <Typography variant="h1">{event.name}</Typography>
          </Grid>

          {/* Cover Image */}
          <Grid item xs={12}>
            <ResizedImage img={event?.coverImage} name={event.name} />
          </Grid>

          {/* Volunteer Role Tags */}
          <Grid item xs={12}>
            <Chip
              color={
                event.volunteerType === VolunteerType.COMMITTED
                  ? "secondary"
                  : "primary"
              }
              label={
                event.volunteerType === VolunteerType.COMMITTED
                  ? COMMITTED_VOLUNTEER_TAG
                  : ALL_VOLUNTEERS_TAG
              }
            />
          </Grid>

          {/* Sign Up Status */}
          {isLoggedIn && !isAdmin(user) && (
            <Grid item xs={12}>
              <SignUpStatusBox
                reason={formStatus.reason}
                signUpData={formStatus.details.acceptedSignUp}
              />
            </Grid>
          )}

          {/* Event Information */}
          <Grid item xs={12}>
            <EventInformation event={event} />
          </Grid>

          {/* Additional Event Information */}
          <Grid item xs={12}>
            <VolunteerRoles event={event} />
          </Grid>

          {[EventType.HANGOUT, EventType.WORKSHOP].includes(
            event.eventType
          ) && (
            <Grid item xs={12}>
              <FacilitatorInfo event={event} />
            </Grid>
          )}

          {/* Registration Form */}
          {isLoggedIn && userCanApplyToEvent && !formStatus.disabled && (
            <Grid item xs={12}>
              <EventRegisterForm
                isDisabled={formStatus.disabled}
                event={event}
                user={user}
              />
            </Grid>
          )}

          {/* Convert to commited volunteer CTA */}
          {isLoggedIn &&
            event.volunteerType === VolunteerType.COMMITTED &&
            user.volunteerType === VolunteerType.ADHOC && (
              <Grid item xs={12}>
                <Typography>
                  This event is only opened to committed volunteers.
                </Typography>
                <BecomeCommitedDialog />
              </Grid>
            )}

          {/* Create Account CTA */}
          {!isLoggedIn && (
            <Grid item xs={12}>
              <CreateAccountNotice />
            </Grid>
          )}

          {/* Admin Buttons */}
          {isAdmin(user) && (
            <>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                onClick={() => router.push(EDIT_EVENT_FORM_ROUTE(event._id))}
                className={classes.editButton}
              >
                <Typography className={classes.editButtonText}>
                  Edit Event
                </Typography>
              </Button>

              <ActionableDialog
                open={isCancelDeleteModalOpen}
                setOpen={() =>
                  setIsCancelDeleteModalOpen(!isCancelDeleteModalOpen)
                }
                content={
                  hasSignUps
                    ? renderDeleteEventContent()
                    : renderCancelEventContent()
                }
                buttonTitle="Confirm"
                buttonOnClick={
                  hasSignUps ? handleDeleteEvent : handleCancelEvent
                }
                openCloseButtonTitle={
                  hasSignUps ? "Delete Event" : "Cancel Event"
                }
                recommendedAction="cancel"
              />
            </>
          )}

          {/* Non-admin Buttons */}
          {!isAdmin(user) && hasAcceptedSignUp && (
            <ActionableDialog
              open={isWithdrawModalOpen}
              setOpen={() => setIsWithdrawModalOpen(!isWithdrawModalOpen)}
              content={renderWithdrawCommitmentQuestion()}
              buttonTitle="Confirm"
              buttonOnClick={withdrawCommitment}
              openCloseButtonTitle="Withdraw"
              recommendedAction="cancel"
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventDetails;
