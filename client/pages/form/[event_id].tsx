import AdminEventForm from '@components/form/AdminEventForm';
import { Grid, Container } from '@material-ui/core';
import Head from '@components/common/Header';
import NavBar from '@components/common/NavBar';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { StoreState } from '@redux/store';

const AdminEventFormPage = () => {
  const userData = useSelector((state: StoreState) => state.user);
  const router = useRouter();
  const eventId = router.query.event_id as string;

  return (
    <Container fixed>
      <Head title="Blessings in a Bag" />
      <NavBar userData={userData.user} />
      <AdminEventForm id={eventId} isNew={eventId === 'new'} />
    </Container>
  );
};

export default AdminEventFormPage;
