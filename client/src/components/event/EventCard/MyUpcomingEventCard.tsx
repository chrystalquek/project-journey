import { makeStyles, Typography } from "@material-ui/core";
import { getSignUps } from "@redux/actions/signUp";
import { selectSignUpsByIds } from "@redux/reducers/signUp";
import { useAppSelector, useAppDispatch } from "@redux/store";
import { EventData } from "@type/event";
import { SignUpStatus } from "@type/signUp";
import React, { FC, useCallback, useEffect } from "react";
import EventCard from "./EventCard";

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 700,
  },
  orangeText: {
    color: theme.palette.warning.main,
  },
}));

const FooterComponent: FC<{ event: EventData }> = ({ event }) => {
  const classes = useStyles();

  // TODO can just fetch own signup.
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getSignUps({ id: user.user?._id ?? "", idType: "userId" }));
  }, [dispatch, user.user?._id]);
  const upcomingSignUps = useAppSelector((state) =>
    selectSignUpsByIds(state, state.signUp.listSignUpIds)
  );

  const renderSignUpStatus = useCallback(() => {
    const signUp = upcomingSignUps.find(
      (upcomingSignUp) => upcomingSignUp?.eventId === event._id
    );
    if (!signUp) {
      return <></>;
    }

    const { status, acceptedRole } = signUp;

    switch (status) {
      case SignUpStatus.ACCEPTED:
        return (
          <Typography color="textSecondary">
            Volunteer role assigned -{acceptedRole}
          </Typography>
        );
      case SignUpStatus.PENDING:
        return (
          <Typography>
            <i>Sign-up pending</i>
          </Typography>
        );
      case SignUpStatus.REJECTED:
        return (
          <Typography className={classes.orangeText}>
            Sign-up unsuccessful
          </Typography>
        );
      default:
        throw new Error(`Unexpected sign up status!`);
    }
  }, [upcomingSignUps, event, classes]);

  return (
    <Typography color="primary" gutterBottom className={classes.bold}>
      {renderSignUpStatus()}
    </Typography>
  );
};

const MyUpcomingEventCard: FC<{
  event: EventData;
}> = ({ event }) => {
  const renderCardContentInfoComponent = useCallback(
    () => <FooterComponent event={event} />,
    [event]
  );

  return (
    <EventCard
      event={event}
      CardContentInfoComponent={renderCardContentInfoComponent}
    />
  );
};

export default MyUpcomingEventCard;
