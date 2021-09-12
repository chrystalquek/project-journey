import Header from "@components/common/Header";
import EventsPageBody from "@components/event/EventsPageBody";
import { listEvents } from "@redux/actions/event";
import { selectEventsByIds } from "@redux/reducers/event";
import { useAppDispatch, useAppSelector } from "@redux/store";
import React, { useEffect } from "react";

const EventPastEventsPage = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);
  const events = useAppSelector((state) =>
    selectEventsByIds(state, state.event.event.listEventIds)
  );

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
