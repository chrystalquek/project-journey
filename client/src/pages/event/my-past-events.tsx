import PastEventsPageBody from "@components/event/PastEvent/PastEvents";
import { checkLoggedIn } from "@utils/helpers/auth";

const EventsPage = () => {
  checkLoggedIn();
  return (
    <>
      <PastEventsPageBody />
    </>
  );
};

export default EventsPage;
