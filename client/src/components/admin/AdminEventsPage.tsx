import Container from '@material-ui/core/Container';
import AdminBreadCrumbs from '@components/admin/AdminBreadCrumbs';
import AdminSearchBar from '@components/admin/AdminSearchBar';
import AdminEvents from '@containers/admin/AdminEvents';

const AdminEventsPage = () => {
  return (
    <Container>
      <AdminBreadCrumbs />
      <AdminSearchBar />
      <div>15 Upcoming Events</div>
      <AdminEvents />
    </Container>
  );
};

export default AdminEventsPage;
