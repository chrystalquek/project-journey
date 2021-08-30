import EventForm from "@components/event/EventForm";
import { useRouter } from "next/router";

const AdminEventFormPage = () => {
  const router = useRouter();
  const eventId = router.query.event_id as string;

  return (
    <>
      <EventForm id={eventId} isNew={false} />
    </>
  );
};

export default AdminEventFormPage;
