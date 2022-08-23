import Header from "@components/common/Header";
import LoadingIndicator from "@components/common/LoadingIndicator";
import EventsPageBody from "@components/event/EventsPageBody";
import { listEvents } from "@redux/actions/event";
import { selectEventsByIds } from "@redux/reducers/event";
import { useAppDispatch, useAppSelector } from "@redux/store";
import React, { useEffect } from "react";

const EventMyPastEventPage = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.session.user);
  const events = useAppSelector((state) =>
    selectEventsByIds(state, state.event.listEventIds)
  );

  const isLoading = useAppSelector((state) => state.event.status === "pending");

  useEffect(() => {
    dispatch(listEvents({ eventType: "past", onlySignedUp: true }));
  }, [dispatch, user]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Header title="Blessings in a Bag" />
      <EventsPageBody type="my-past-events" {...{ events, user }} />
    </>
  );
};

export default EventMyPastEventPage;
