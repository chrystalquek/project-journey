import Header from "@components/common/Header";
import EventsPageBody from "@components/event/EventsPageBody";
import { getSignedUpEventsUpcomingEvent } from "@redux/actions/event";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { useAuthenticatedRoute } from "@utils/helpers/auth";
import React, { useEffect } from "react";

const EventMyUpcomingEventsPage = () => {
  useAuthenticatedRoute();
  const dispatch = useAppDispatch();

  const events = useAppSelector((state) =>
    state.event.event.upcomingEvent.ids
      .map((eid) => state.event.event.data[eid])
      .filter((event) => event)
  );
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(
      getSignedUpEventsUpcomingEvent({
        userId: user._id,
        eventType: "upcoming",
      })
    );
  }, [dispatch, user]);

  return (
    <>
      <Header title="Blessings in a Bag" />
      <EventsPageBody type="my-upcoming-events" {...{ events, user }} />
    </>
  );
};

export default EventMyUpcomingEventsPage;
