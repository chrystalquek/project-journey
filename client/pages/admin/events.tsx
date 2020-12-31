import Head from '@components/common/Header';
import NavBar from '@components/common/NavBar';
import AdminEventsPage from '@containers/admin/AdminEventsPage';

const AdminEvents = () => (
  <>
    <Head title="Blessings in a Bag" />
    <NavBar userData={null} />
    <AdminEventsPage />
  </>
);

export default AdminEvents;
