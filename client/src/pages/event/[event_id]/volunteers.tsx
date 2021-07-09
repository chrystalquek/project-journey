import { useRouter } from "next/router";
import EventVolunteers from "@components/event/EventVolunteers/EventVolunteers";
import { checkLoggedIn } from "@utils/helpers/auth";

// Handles checking that user is logged in and event detail validity
const EventVolunteersPage = () => {
  checkLoggedIn();
  const router = useRouter();
  const eventId = router.query.event_id as string;

  return (
    <>
      <EventVolunteers eid={eventId} />
    </>
  );
};

export default EventVolunteersPage;
