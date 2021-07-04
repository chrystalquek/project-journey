import { makeStyles, Typography } from "@material-ui/core";
import { EventData } from "@type/event";
import React, { FC, useCallback } from "react";
import { getEventVacancies } from "../helpers/EventsPageBody";
import EventCard from "./EventCard";

const useStyles = makeStyles(() => ({
  bold: {
    fontWeight: 700,
  },
}));

const PublicEventCard: FC<{
  event: EventData;
}> = ({ event }) => {
  const classes = useStyles();
  const { total, remaining } = getEventVacancies(event);

  const renderCardContentInfoComponent = useCallback(
    () => (
      <Typography color="primary" gutterBottom className={classes.bold}>
        {`${remaining}/${total} ${
          remaining === 1 ? "vacancy" : "vacancies"
        } left`}
      </Typography>
    ),
    [total, remaining]
  );

  return (
    <EventCard
      event={event}
      CardContentInfoComponent={renderCardContentInfoComponent}
    />
  );
};

export default PublicEventCard;
