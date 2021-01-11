import Head from '@components/common/Header';
import NavBar from '@components/common/NavBar';
import EventsPageBody from '@containers/event/EventsPageBody';
import { StoreState } from '@redux/store';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';

const EventsPage = () => {
  const userData = useSelector((state: StoreState) => state.user);

  return (
    <>
      <Head title="Blessings in a Bag" />
      <NavBar userData={userData.user} />
      <div style={{ width: '80vw', margin: 'auto' }}>
        <EventsPageBody />
      </div>
    </>
  );
};

export default EventsPage;
