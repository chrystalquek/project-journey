import AdminEventForm from '@components/form/AdminEventForm';
import { Grid } from '@material-ui/core';
import Head from '@components/common/Header';
import NavBar from '@components/common/NavBar';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { StoreState } from '@redux/store';
import { useState } from 'react';

const AdminEventFormPage = () => {
  const userData = useSelector((state: StoreState) => state.user);
  const router = useRouter();
  const eventId = router.query.event_id as string;

  return (
    <Grid container direction="column" spacing={6}>
      <Grid item>
        <Head title="Blessings in a Bag" />
        <NavBar userData={userData.user} />
      </Grid>
      <Grid item container>
        <Grid item md={2} />
        <Grid item container direction="column" xs={12} md={8}>
          <AdminEventForm id={eventId} isNew={eventId === 'new'} />
          <Grid item md={2} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminEventFormPage;
