import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "@redux/store";
import {EventData} from "@type/event";
import EventDetailsRegistered from "@components/event/EventDetails/EventDetailsRegistered";
import {VolunteerData} from "@type/volunteer";
import {Container} from "@material-ui/core";
import React, {useEffect} from "react";
import {getEvent} from "@redux/actions/event";
import EventDetailsUnregistered from "@components/event/EventDetails/EventDetailsUnregistered";

// Handles checking that user is logged in and event detail validity
const EventsDetailPage = () => {
  const router = useRouter();
  const { eid } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    if (eid) {
      dispatch(getEvent(String(eid)));
    }
  }, [eid])

  const userData: VolunteerData = useSelector((state: StoreState) => state.user.user);
  const eventData: EventData | null = useSelector((state: StoreState) => state.event.form);
  let body;
  if (userData && eventData) {
    body = <EventDetailsRegistered user={userData} event={eventData}/>;
  } else if (eventData) {
    body = <EventDetailsUnregistered user={userData} event={eventData}/>;
  } else {
    body = <div>Loading...</div>
  }

  return (
    <Container fixed>
      {body}
    </Container>
  )
}

export default EventsDetailPage;
