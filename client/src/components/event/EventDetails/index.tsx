import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { getEvent } from "@redux/actions/event";
import { VolunteerData } from "@type/volunteer";
import { EventData } from "@type/event";
import EventDetailsRegistered from "@components/event/EventDetails/EventDetailsRegistered/eventDetails";
import EventDetailsUnregistered from "@components/event/EventDetails/EventDetailsUnregistered";
import { EventDetailsWrapper } from "@components/event/EventDetails/EventDetailsWrapper";
import LoadingIndicator from "@components/common/LoadingIndicator";
import Header from "@components/common/Header";

type EventDetailsProps = {
  eid: string;
};

const EventDetails: FC<EventDetailsProps> = ({ eid }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (eid) {
      dispatch(getEvent(String(eid)));
    }
  }, [eid]);

  const userData: VolunteerData = useAppSelector((state) => state.user.user);
  const eventData: EventData | null = useAppSelector(
    (state) => state.event.form
  );

  return (
    <>
      <Header title={eventData?.name ?? "Event"} />
      {userData && eventData && (
        <EventDetailsWrapper event={eventData}>
          <EventDetailsRegistered user={userData} event={eventData} />
        </EventDetailsWrapper>
      )}
      {!userData && eventData && (
        <EventDetailsWrapper event={eventData}>
          <EventDetailsUnregistered user={userData} event={eventData} />;
        </EventDetailsWrapper>
      )}
      {!userData && !eventData && <LoadingIndicator />}
    </>
  );
};

export { EventDetails };
