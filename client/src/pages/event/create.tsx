import EventForm from "@components/event/EventForm";
import { checkLoggedIn } from "@utils/helpers/auth";

const AdminEventFormPage = () => {
  checkLoggedIn();

  return <EventForm id="new" isNew />;
};

export default AdminEventFormPage;
