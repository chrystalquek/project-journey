import { useAuthenticatedRoute } from "@utils/helpers/auth";
import UpcomingEvents from "@components/event/UpcomingEvents/UpcomingEvents";

const UpcomingEventsPage = () => {
  useAuthenticatedRoute();
  return (
    <>
      <UpcomingEvents />
    </>
  );
};

export default UpcomingEventsPage;
