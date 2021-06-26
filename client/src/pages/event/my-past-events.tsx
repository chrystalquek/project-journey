import Head from "@components/common/Header";
import PastEventsPageBody from "@components/event/PastEvent/PastEvents";
import { checkLoggedIn } from "@utils/helpers/auth";

const EventsPage = () => {
  checkLoggedIn();
  return (
    <>
      <Head title="Blessings in a Bag" />
      <div style={{ width: "80vw", margin: "auto" }}>
        <PastEventsPageBody />
      </div>
    </>
  );
};

export default EventsPage;
