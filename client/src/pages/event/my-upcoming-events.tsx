import Header from "@components/common/Header";
import EventsPageBody from "@components/event/EventsPageBody";
import { listEvents } from "@redux/actions/event";
import { selectEventsByIds } from "@redux/reducers/event";
import { useAppDispatch, useAppSelector } from "@redux/store";
import React, { useEffect } from "react";

const EventMyUpcomingEventsPage = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.session.user);
  const events = useAppSelector((state) =>
    selectEventsByIds(state, state.event.listEventIds)
  );

  useEffect(() => {
    dispatch(listEvents({ eventType: "upcoming", onlySignedUp: true }));
  }, [dispatch, user]);

  return (
    <>
      <Header title="Blessings in a Bag" />
      {user && (
        <EventsPageBody type="my-upcoming-events" {...{ events, user }} />
      )}
    </>
  );
};

export default EventMyUpcomingEventsPage;
