import { useRouter } from 'next/router';
import { Container } from '@material-ui/core';
import React from 'react';
import { EventDetails } from '@components/event/EventDetails';
import { checkLoggedIn } from '@utils/helpers/auth';

// Handles checking that user is logged in and event detail validity
const EventsDetailPage = () => {
  checkLoggedIn()
  const router = useRouter();
  const { eid } = router.query;

  return (
    <Container fixed>
      <EventDetails eid={eid as string} />
    </Container>
  );
};

export default EventsDetailPage;
