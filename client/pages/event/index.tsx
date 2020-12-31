import Head from '@components/common/Header';
import NavBar from '@components/common/NavBar';
import AdminEventsPage from '@containers/event/EventsPage';
import { StoreState } from '@redux/store';
import { useSelector } from 'react-redux';

const AdminEvents = () => {
  const userData = useSelector((state: StoreState) => state.user);

  return (
    <>
      <Head title="Blessings in a Bag" />
      <NavBar userData={userData.user} />
      <AdminEventsPage />
    </>
  );
};

export default AdminEvents;
