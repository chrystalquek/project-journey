import EventForm from "@components/event/EventForm";
import { Container } from "@material-ui/core";
import Head from "@components/common/Header";
import { checkLoggedIn } from "@utils/helpers/auth";

const AdminEventFormPage = () => {
  checkLoggedIn();

  return (
    <Container fixed>
      <Head title="Blessings in a Bag" />
      <EventForm id="new" isNew />
    </Container>
  );
};

export default AdminEventFormPage;
