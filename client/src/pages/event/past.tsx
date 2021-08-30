import Header from "@components/common/Header";
import EventsPageBody from "@components/event/EventsPageBody";
import { listEvents } from "@redux/actions/event";
import { useAppDispatch, useAppSelector } from "@redux/store";
import React, { useEffect } from "react";

const EventPastEventsPage = () => {
  const dispatch = useAppDispatch();

  const events = useAppSelector((state) =>
    state.event.event.pastEvents.ids
      .map((eid) => state.event.event.data[eid])
      .filter((event) => event)
  );
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(listEvents({ eventType: "past" }));
  }, [dispatch, user]);

  return (
    <>
      <Header title="Blessings in a Bag" />
      <EventsPageBody type="my-past-events" {...{ events, user }} />
    </>
  );
};

export default EventPastEventsPage;
