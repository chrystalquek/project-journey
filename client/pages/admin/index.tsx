import Head from '@components/common/Header';
import AdminEventsPage from '@components/admin/AdminEventsPage';
import NavBar from '@components/common/NavBar';

const AdminHome = () => (
  <>
    <Head title="Blessings in a Bag" />
    {/*<NavBar />*/}
    <AdminEventsPage />
  </>
);

export default AdminHome;
