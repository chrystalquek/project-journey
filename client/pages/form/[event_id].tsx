import AdminEventForm from '@components/form/AdminEventForm';
import { Grid, Container } from '@material-ui/core';
import Head from '@components/common/Header';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { StoreState } from '@redux/store';

const AdminEventFormPage = () => {
  const router = useRouter();
  const eventId = router.query.event_id as string;

  return (
    <Container fixed>
      <Head title="Blessings in a Bag" />
      <AdminEventForm id={eventId} isNew={eventId === 'new'} />
    </Container>
  );
};

export default AdminEventFormPage;
