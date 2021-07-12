import EventForm from "@components/event/EventForm";
import { useAuthenticatedRoute } from "@utils/helpers/auth";

const AdminEventFormPage = () => {
  useAuthenticatedRoute();

  return <EventForm id="new" isNew />;
};

export default AdminEventFormPage;
