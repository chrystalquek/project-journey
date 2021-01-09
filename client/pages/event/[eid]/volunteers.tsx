import { useRouter } from 'next/router';
import { Container } from '@material-ui/core';
import Head from '@components/common/Header';
import NavBar from '@components/common/NavBar';
import Container from '@material-ui/core/Container';

// Handles checking that user is logged in and event detail validity
const EventVolunteersPage = () => {
  const router = useRouter();
  const { eid } = router.query;

  //   const userData: VolunteerData = useSelector((state: StoreState) => state.user.user);
  //   const eventData: EventData | null = useSelector((state: StoreState) => {
  //     const ret = state.event.events.filter((e: EventData) => e._id === eid);
  //     if (ret.length === 0 || ret.length > 1) {
  //       return null;
  //     }
  //     return ret[0];
  //   });

  return (
    <Container fixed>
      <Head title="Blessings in a Bag" />
      <NavBar userData={userData.user} />
      {/* {eventData && userData
        ? <EventDetails user={userData} event={eventData} />
        : <ErrorPage statusCode={500} />} */}
      <h1>HELLO</h1>
      <h1>{eid}</h1>
    </Container>
  );
};

export default EventVolunteersPage;
