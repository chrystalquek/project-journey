import { checkLoggedIn } from "@utils/helpers/auth";
import UpcomingEvents from "@components/event/UpcomingEvents/UpcomingEvents";

const UpcomingEventsPage = () => {
  checkLoggedIn();
  return (
    <>
      <UpcomingEvents />
    </>
  );
};

export default UpcomingEventsPage;
