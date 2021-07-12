import EventForm from "@components/event/EventForm";
import { useRouter } from "next/router";
import { useAuthenticatedRoute } from "@utils/helpers/auth";

const AdminEventFormPage = () => {
  const router = useRouter();
  const eventId = router.query.event_id as string;
  useAuthenticatedRoute();

  return (
    <>
      <EventForm id={eventId} isNew={false} />
    </>
  );
};

export default AdminEventFormPage;
