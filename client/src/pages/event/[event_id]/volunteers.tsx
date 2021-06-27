import { useRouter } from "next/router";
import { Container } from "@material-ui/core";
import Head from "@components/common/Header";
import EventVolunteers from "@components/event/EventVolunteers/EventVolunteers";
import { checkLoggedIn } from "@utils/helpers/auth";

// Handles checking that user is logged in and event detail validity
const EventVolunteersPage = () => {
  checkLoggedIn();
  const router = useRouter();
  const eventId = router.query.event_id as string;

  return (
    <>
      <Head title="Blessings in a Bag" />
      <Container fixed>
        <EventVolunteers eid={eventId} />
      </Container>
    </>
  );
};

export default EventVolunteersPage;
