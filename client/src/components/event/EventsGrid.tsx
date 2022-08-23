import { Grid, makeStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { EventData } from "@type/event";
import React, { FC, useCallback } from "react";
import PublicEventCard from "./EventCard/PublicEventCard";
import MyUpcomingEventCard from "./EventCard/MyUpcomingEventCard";
import MyPastEventCard from "./EventCard/MyPastEventCard";

const useStyles = makeStyles(() => ({
  cardGrid: {
    display: "flex",
  },
}));

type Props = {
  events: Array<EventData>;
  type: "public" | "my-upcoming-events" | "my-past-events";
};

const EventsGrid: FC<Props> = ({ events, type }) => {
  const theme = useTheme();
  const classes = useStyles();
  const screenSm = useMediaQuery(theme.breakpoints.down("sm"));

  const renderCard = useCallback(
    (event: EventData) => {
      switch (type) {
        case "public":
          return <PublicEventCard key={event._id} event={event} />;
        case "my-upcoming-events":
          return <MyUpcomingEventCard key={event._id} event={event} />;
        case "my-past-events":
          return <MyPastEventCard key={event._id} event={event} />;
        default:
          throw new Error("Unexpected card type");
      }
    },
    [type]
  );

  return (
    <Grid item container sm={12} spacing={screenSm ? 4 : 2}>
      {events.map((event) => (
        <Grid key={event._id} item className={classes.cardGrid} sm={6} md={4}>
          {renderCard(event)}
        </Grid>
      ))}
    </Grid>
  );
};

export default EventsGrid;
