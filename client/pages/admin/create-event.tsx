import AdminCreateEventForm from '@components/form/AdminCreateEventForm';
import { Grid, AppBar } from '@material-ui/core';

const AdminCreateEvent = () => (
  <Grid container direction="column">
    <Grid item>
      <AppBar />
    </Grid>
    <Grid item container>
      <Grid item md={2} />
      <Grid item container direction="column" xs={12} md={8}>
        <AdminCreateEventForm />
        <Grid item md={2} />
      </Grid>
    </Grid>
  </Grid>
);

export default AdminCreateEvent;
