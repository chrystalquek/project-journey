import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import { isAdmin } from "@utils/helpers/auth";
import React, { FC, useEffect } from "react";
import { EventData } from "@type/event";
import { useAppDispatch, useAppSelector } from "@redux/store";
import {
  getEventsUpcomingEvent,
  getSignedUpEventsUpcomingEvent,
} from "@redux/actions/event";
import { getSignUpsUpcomingEvent } from "@redux/actions/signUp";
import { formatDateStartEndTime } from "@utils/helpers/date";
import { useRouter } from "next/router";
import { CREATE_EVENT_FORM_ROUTE } from "@constants/routes";
import { SignUpStatus } from "@type/signUp";

const useStyles = makeStyles((theme) => ({
  pane: {
    background: theme.palette.secondary.light,
    overflow: "scroll",
    height: "70vh",
  },
  card: {
    margin: theme.spacing(5),
    cursor: "pointer",
  },
  greenText: {
    color: theme.palette.text.secondary,
  },
  orangeText: {
    color: theme.palette.tertiary.main,
  },
  header: {
    padding: theme.spacing(5),
    fontWeight: "bold",
  },
  button: {
    padding: theme.spacing(5),
    margin: theme.spacing(5),
    backgroundColor: theme.palette.primary.main,
    height: 30,
    borderRadius: "5em",
    fontSize: "small",
    justifyContent: "center",
    alignItems: "center",
  },
  noEvents: {
    position: "relative",
    top: "30%",
  },
}));

const UpcomingEvent: FC<{}> = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isAdmin(user)) {
      dispatch(getEventsUpcomingEvent({ eventType: "upcoming" }));
    } else {
      dispatch(
        getSignedUpEventsUpcomingEvent({
          eventType: "upcoming",
          userId: user.user?._id,
        })
      );
      dispatch(
        getSignUpsUpcomingEvent({ id: user.user?._id, idType: "userId" })
      );
    }
  }, [dispatch, user]);

  const events = useAppSelector((state) => state.event.event);
  const signUps = useAppSelector((state) => state.signUp); // only relevant if user is volunteer

  const upcomingEventsIds = events.upcomingEvent.ids;
  const upcomingSignUpsIds = signUps.volunteerSignUpsForUpcomingEvent.ids;

  const upcomingEvents = upcomingEventsIds.map((id) => events.data[id]);
  const upcomingSignUps = upcomingSignUpsIds.map((id) => signUps.data[id]);

  const generateNotification = (event: EventData) => {
    if (isAdmin(user)) {
      const moreVolunteersCount = event.roles
        .map((role) => role.capacity - role.volunteers.length)
        .reduce((a, b) => a + b, 0);
      return (
        <Typography
          className={
            moreVolunteersCount > 0 ? classes.greenText : classes.orangeText
          }
        >
          {moreVolunteersCount} more volunteers needed
        </Typography>
      );
    }
    // is volunteer
    const signUp = upcomingSignUps.find(
      (upcomingSignUp) => upcomingSignUp.eventId === event._id
    );

    if (!signUp) {
      return <></>;
    }

    const { status, acceptedRole } = signUp;

    switch (status) {
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
      case SignUpStatus.ACCEPTED:
        return (
          <Typography className={classes.greenText}>
            Volunteer role assigned -{acceptedRole}
          </Typography>
        );
      default:
        return <Typography>-</Typography>;
    }
  };

  const adminNoEventsUpcoming = (
    <Typography align="center">
      There are no events upcoming.
      <br />
      Click below to create a new event.
      <br />
      <Button
        className={classes.button}
        onClick={() => router.push(CREATE_EVENT_FORM_ROUTE)}
      >
        Create New Event
      </Button>
    </Typography>
  );

  const volunteerNoEventsUpcoming = (
    <Typography align="center">
      You have no events upcoming.
      <br />
      Click below to browse events.
      <br />
      <Button className={classes.button} onClick={() => router.push("/event")}>
        Browse Events
      </Button>
    </Typography>
  );

  return (
    <div className={classes.pane}>
      <Typography className={classes.header} variant="h2" align="center">
        {isAdmin(user) ? "" : "My "}
        Upcoming Events
      </Typography>
      {upcomingEvents.length === 0 ? (
        <div className={classes.noEvents}>
          {isAdmin(user) ? adminNoEventsUpcoming : volunteerNoEventsUpcoming}
        </div>
      ) : (
        upcomingEvents.map((event) => (
          <Card
            className={classes.card}
            key={event._id}
            onClick={() => router.push(`/event/${event._id}`)}
          >
            <CardContent>
              <Typography variant="h2" style={{ fontWeight: "bold" }}>
                {event.name}
              </Typography>
              <Typography>
                Date and Time:{" "}
                {formatDateStartEndTime(
                  new Date(event.startDate),
                  new Date(event.endDate)
                )}
              </Typography>
              {generateNotification(event)}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default UpcomingEvent;
