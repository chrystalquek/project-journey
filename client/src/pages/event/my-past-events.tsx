import Header from "@components/common/Header";
import EventsPageBody from "@components/event/EventsPageBody";
import { getSignedUpEventsPastEvent } from "@redux/actions/event";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { useAuthenticatedRoute } from "@utils/helpers/auth";
import React, { useEffect } from "react";

const EventMyPastEventPage = () => {
  useAuthenticatedRoute();
  const dispatch = useAppDispatch();

  const events = useAppSelector((state) =>
    state.event.event.pastEvents.ids
      .map((eid) => state.event.event.data[eid])
      .filter((event) => event)
  );
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(
      getSignedUpEventsPastEvent({ userId: user._id, eventType: "past" })
    );
  }, [dispatch, user]);

  return (
    <>
      <Header title="Blessings in a Bag" />
      <EventsPageBody type="my-past-events" {...{ events, user }} />
    </>
  );
};

export default EventMyPastEventPage;
