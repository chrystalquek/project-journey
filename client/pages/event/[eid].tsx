import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {StoreState} from "@redux/store";
import {EventData} from "@type/event";
import ErrorPage from "next/error";
import EventDetails from "@components/event/EventDetails";
import {VolunteerData} from "@type/volunteer";

// Handles checking that user is logged in and event detail validity
const EventsDetailPage = () => {
  const router = useRouter();
  const { eid } = router.query;

  const userData: VolunteerData = useSelector((state: StoreState) => state.user.user);
  const eventData: EventData | null = useSelector((state: StoreState) => {
    const ret = state.event.events.filter((e: EventData) => e._id === eid);
    if (ret.length === 0 || ret.length > 1) {
      return null;
    }
    return ret[0];
  });

  return (
    <>
      {eventData && userData
        ? <EventDetails user={userData} event={eventData}/>
        : <ErrorPage statusCode={500} />}
    </>
  )
}

export default EventsDetailPage;
