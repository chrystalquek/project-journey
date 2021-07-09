import EventForm from "@components/event/EventForm";
import { useRouter } from "next/router";
import { checkLoggedIn } from "@utils/helpers/auth";

const AdminEventFormPage = () => {
  const router = useRouter();
  const eventId = router.query.event_id as string;
  checkLoggedIn();

  return (
    <>
      <EventForm id={eventId} isNew={false} />
    </>
  );
};

export default AdminEventFormPage;
