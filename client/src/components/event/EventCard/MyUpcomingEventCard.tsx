import { makeStyles, Typography } from "@material-ui/core";
import { useAppSelector } from "@redux/store";
import { EventData } from "@type/event";
import { SignUpStatus } from "@type/signUp";
import React, { FC, useCallback } from "react";
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

  const signUps = useAppSelector((state) => state.signUp);
  const upcomingSignUpsIds = signUps.volunteerSignUpsForUpcomingEvent.ids;
  const upcomingSignUps = upcomingSignUpsIds.map((id) => signUps.data[id]);

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
