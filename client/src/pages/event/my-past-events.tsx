import PastEventsPageBody from "@components/event/PastEvent/PastEvents";
import { useAuthenticatedRoute } from "@utils/helpers/auth";

const EventsPage = () => {
  useAuthenticatedRoute();
  return (
    <>
      <PastEventsPageBody />
    </>
  );
};

export default EventsPage;
