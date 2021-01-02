import AdminEventForm from '@components/form/AdminEventForm';
import { Grid } from '@material-ui/core';
import Head from '@components/common/Header';
import NavBar from '@components/common/NavBar';
import { useSelector } from 'react-redux';
import { StoreState } from '@redux/store';

const AdminCreateEvent = () => {
  const userData = useSelector((state: StoreState) => state.user);
  return (
    <Grid container direction="column" spacing={6}>
      <Grid item>
        <Head title="Blessings in a Bag" />
        <NavBar userData={userData.user} />
      </Grid>
      <Grid item container>
        <Grid item md={2} />
        <Grid item container direction="column" xs={12} md={8}>
          <AdminEventForm />
          <Grid item md={2} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminCreateEvent;
