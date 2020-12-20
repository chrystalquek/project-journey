import Container from '@material-ui/core/Container';
import AdminBreadCrumbs from '@components/admin/AdminBreadCrumbs';
import SearchBar from '@components/common/SearchBar';
import AdminEvents from '@containers/admin/AdminEvents';

const AdminEventsPage = () => {
  return (
    <Container fixed>
      <AdminBreadCrumbs />
      <SearchBar />
      <div>15 Upcoming Events</div>
      <AdminEvents />
    </Container>
  );
};

export default AdminEventsPage;
