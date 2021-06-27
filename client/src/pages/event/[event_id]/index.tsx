import { useRouter } from "next/router";
import { Container } from "@material-ui/core";
import React from "react";
import { EventDetails } from "@components/event/EventDetails";

// Handles checking that user is logged in and event detail validity
const EventsDetailPage = () => {
  const router = useRouter();
  const eventId = router.query.event_id as string;

  return (
    <Container fixed>
      <EventDetails eid={eventId} />
    </Container>
  );
};

export default EventsDetailPage;
