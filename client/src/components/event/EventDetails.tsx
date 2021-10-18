import { ActionableDialog } from "@components/common/ActionableDialog";
import ResizedImage from "@components/common/image/ResizedImage";
import LoadingIndicator from "@components/common/LoadingIndicator";
import { COMMITTED_VOLUNTEER_TAG } from "@components/event/index";
import BecomeCommitedDialog from "@components/profile/BecomeCommitedDialog";
import { Chip, Container, Grid, Typography } from "@material-ui/core";
import { getEvent } from "@redux/actions/event";
import { deleteSignUp, getSignUps } from "@redux/actions/signUp";
import { selectEventById } from "@redux/reducers/event";
import { selectSignUpsByIds } from "@redux/reducers/signUp";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { EventType } from "@type/event";
import { SignUpStatus } from "@type/signUp";
import { VolunteerType } from "@type/volunteer";
import { isAdmin } from "@utils/helpers/auth";
import { useIsMobile } from "@utils/helpers/layout";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSnackbar } from "notistack";
import EventBreadCrumbs from "./EventBreadCrumbs";
import AdminButtons from "./EventDetails/AdminButtons";
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

const EventDetails = ({ eid }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state.session.user);
  const event = useAppSelector((state) => selectEventById(state, eid));
  const isLoading = useAppSelector(
    (state) =>
      state.event.status === "pending" || state.signUp.status === "pending"
  );
  const signUpFetchStatus = useAppSelector((state) => state.signUp.status);
  const { enqueueSnackbar } = useSnackbar();

  const isMobile = useIsMobile();
  const isLoggedIn = !!user;

  // TODO (aloy): Move this business logic to backend.
  const userCanApplyToEvent =
    user &&
    event &&
    (user.volunteerType === VolunteerType.COMMITTED ||
      (user.volunteerType === VolunteerType.ADHOC &&
        event.volunteerType === VolunteerType.ADHOC));

  useEffect(() => {
    dispatch(getEvent(eid));
    dispatch(getSignUps({ id: user?._id ?? "", idType: "userId" }));
  }, [dispatch, eid, user?._id]);

  // ========================
  // TODO (aloy): Simplify this.
  // i think can have just a single fetch for sign up?
  const currSignUps = useAppSelector((state) =>
    selectSignUpsByIds(state, state.signUp.listSignUpIds)
  );

  const [formStatus, hasAcceptedSignUp] = useMemo(() => {
    // for volunteer purpose
    const signUpInfo = currSignUps.filter(
      (signUp) => signUp.eventId === event?._id
    );
    const isEventFull = getEventVacancies(event ?? null).remaining === 0;
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
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const withdrawCommitment = () => {
    const signUpInfo = currSignUps.filter(
      (signUp) => signUp.eventId === event?._id
    );
    const acceptedSignUp = signUpInfo.find(
      (signUp) => signUp.status === SignUpStatus.ACCEPTED
    );
    dispatch(
      deleteSignUp({
        id: acceptedSignUp?._id ?? "",
        idType: "signUpId",
      })
    );
    if (signUpFetchStatus === "rejected") {
      enqueueSnackbar("Sign up withdrawal failed.", {
        variant: "error",
      });
    } else if (signUpFetchStatus === "fulfilled") {
      enqueueSnackbar("Successfully withdrew sign up!", {
        variant: "success",
      });
    }
    router.push("/event");
  };
  const renderWithdrawCommitmentQuestion = useCallback(
    () => (
      <>
        Are you sure you want to withdraw from
        <b>{event?.name}?</b>
        <br />
        <br />
        Withdrawal from event cannot be undone.
      </>
    ),
    [event]
  );
  // =========================

  if (!event || isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Container>
      <Grid
        container
        direction="row"
        wrap="nowrap"
        style={{
          display: "flex",
          justifyContent: isMobile ? "center" : "flex-start",
        }}
      >
        {/* Desktop - Side Navigation */}
        {!isMobile && (
          <Grid item xs={2}>
            <SideNav selected="details" eventId={event._id} />
          </Grid>
        )}

        <Grid item container xs={8} spacing={8}>
          <Grid item xs={12}>
            <EventBreadCrumbs name={event.name} />
          </Grid>

          {/* Event Title */}
          <Grid item xs={12}>
            <Typography variant="h1">{event.name}</Typography>
          </Grid>

          {/* Cover Image */}
          {event?.coverImage && (
            <Grid item xs={12}>
              <ResizedImage img={event?.coverImage} name={event.name} />
            </Grid>
          )}

          {/* Volunteer Role Tags */}
          {event.volunteerType === VolunteerType.COMMITTED && (
            <Grid item xs={12}>
              <Chip color="secondary" label={COMMITTED_VOLUNTEER_TAG} />
            </Grid>
          )}

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
          {user && isLoggedIn && userCanApplyToEvent && !formStatus.disabled && (
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
            user?.volunteerType === VolunteerType.ADHOC && (
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
          {isAdmin(user) && <AdminButtons event={event} />}

          {/* Non-admin Buttons */}
          {!isAdmin(user) && hasAcceptedSignUp && (
            <ActionableDialog
              open={isWithdrawModalOpen}
              setOpen={() => setIsWithdrawModalOpen(!isWithdrawModalOpen)}
              content={renderWithdrawCommitmentQuestion()}
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
