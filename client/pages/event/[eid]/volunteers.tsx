import { useRouter } from 'next/router';
import { Container } from '@material-ui/core';
import Head from '@components/common/Header';
import NavBar from '@components/common/NavBar';
import EventVolunteers from '@components/event/EventVolunteers/EventVolunteers';
import { useSelector } from 'react-redux';
import { StoreState } from '@redux/store';

// Handles checking that user is logged in and event detail validity
const EventVolunteersPage = () => {
  const router = useRouter();
  const { eid } = router.query;
  const userData = useSelector((state: StoreState) => state.user);

  return (
    <Container fixed>
      <Head title="Blessings in a Bag" />
      <NavBar userData={userData.user} />
      <EventVolunteers eid={eid} />
    </Container>
  );
};

export default EventVolunteersPage;
