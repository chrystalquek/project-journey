import { EventDetails } from "@components/event/EventDetails";
import { useRouter } from "next/router";
import React from "react";

// Handles checking that user is logged in and event detail validity
const EventsDetailPage = () => {
  const router = useRouter();
  const eventId = router.query.event_id as string;

  return (
    <>
      <EventDetails eid={eventId} />
    </>
  );
};

export default EventsDetailPage;
