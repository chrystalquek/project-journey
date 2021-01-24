import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getEvent} from "@redux/actions/event";
import {VolunteerData} from "@type/volunteer";
import {StoreState} from "@redux/store";
import {EventData} from "@type/event";
import EventDetailsRegistered from "@components/event/EventDetails/EventDetailsRegistered";
import EventDetailsUnregistered from "@components/event/EventDetails/EventDetailsUnregistered";
import {CircularProgress} from "@material-ui/core";

type EventDetailsProps = {
  eid: string,
}

const EventDetails: FC<EventDetailsProps> = ({ eid }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (eid) {
      dispatch(getEvent(String(eid)));
    }
  }, [eid]);

  const userData: VolunteerData = useSelector((state: StoreState) => state.user.user);
  const eventData: EventData | null = useSelector((state: StoreState) => state.event.form);

  if (userData && eventData) {
    return <EventDetailsRegistered user={userData} event={eventData} />;
  } else if (eventData) {
    return <EventDetailsUnregistered user={userData} event={eventData} />;
  } else {
    return <CircularProgress />;
  }
}

export { EventDetails };