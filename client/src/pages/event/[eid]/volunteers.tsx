import { useRouter } from "next/router";
import { Container } from "@material-ui/core";
import Head from "@components/common/Header";
import EventVolunteers from "@components/event/EventVolunteers/EventVolunteers";
import { checkLoggedIn } from "@utils/helpers/auth";

// Handles checking that user is logged in and event detail validity
const EventVolunteersPage = () => {
  checkLoggedIn();
  const router = useRouter();
  const { eid } = router.query;

  return (
    <>
      <Head title="Blessings in a Bag" />
      <Container fixed>
        <EventVolunteers eid={eid} />
      </Container>
    </>
  );
};

export default EventVolunteersPage;
