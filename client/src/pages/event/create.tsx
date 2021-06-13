import EventForm from '@components/event/EventForm';
import { Container } from '@material-ui/core';
import Head from '@components/common/Header';
import { useRouter } from 'next/router';
import { checkLoggedIn } from '@utils/helpers/auth';

const AdminEventFormPage = () => {
  const router = useRouter();
  const eventId = router.query.event_id as string;
  checkLoggedIn();

  // event/create
  // event/{id}/edit
  return (
    <Container fixed>
      <Head title="Blessings in a Bag" />
      <EventForm id={eventId} isNew={eventId === 'new'} />
    </Container>
  );
};

export default AdminEventFormPage;
