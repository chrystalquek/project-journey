import { Button, makeStyles } from "@material-ui/core";
import { EventData } from "@type/event";
import React, { FC, useCallback, useState } from "react";
import FeedbackModal from "../FeedbackModal";
import EventCard from "./EventCard";

const useStyles = makeStyles((theme) => ({
  viewFeedbackButton: {
    textTransform: "none",
    color: theme.palette.text.disabled,
    fontWeight: "bold",
  },
  submitFeedbackButton: {
    textTransform: "none",
    color: theme.palette.primary.dark,
    fontWeight: "bold",
  },
}));

const FooterComponent: FC<{ event: EventData }> = ({ event }) => {
  const classes = useStyles();
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        className={
          event?.feedbackStatus
            ? classes.viewFeedbackButton
            : classes.submitFeedbackButton
        }
        onClick={() => setOpen(true)}
      >
        {event?.feedbackStatus
          ? "View Submitted Feedback"
          : "Submit Volunteer Feedback"}
      </Button>
      <FeedbackModal
        title={event.name}
        imageUrl={event?.coverImage}
        eventDate={new Date(event.startDate)}
        description={event.description}
        isOpen={isOpen}
        eventId={event._id}
        initialState={event?.feedbackStatus ? "success" : "prompt"}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

const MyPastEventCard: FC<{
  event: EventData;
}> = ({ event }) => {
  const renderFooterComponent = useCallback(
    () => <FooterComponent event={event} />,
    [event]
  );

  return (
    <EventCard event={event} CardFooterComponent={renderFooterComponent} />
  );
};

export default MyPastEventCard;
