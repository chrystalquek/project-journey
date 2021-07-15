import Header from "@components/common/Header";
import EventsPageBody from "@components/event/EventsPageBody";
import { getUpcomingEvents } from "@redux/actions/event";
import { useAppDispatch, useAppSelector } from "@redux/store";
import React, { useEffect } from "react";

const EventIndexPage = () => {
  const dispatch = useAppDispatch();

  const events = useAppSelector((state) =>
    state.event.event.browseEvents.ids
      .map((eid) => state.event.event.data[eid])
      .filter((event) => event)
  );
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getUpcomingEvents());
  }, [dispatch]);

  return (
    <>
      <Header title="Blessings in a Bag" />
      <EventsPageBody type="public" {...{ events, user }} />
    </>
  );
};
export default EventIndexPage;
