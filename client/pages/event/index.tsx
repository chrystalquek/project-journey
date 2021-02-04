import Head from '@components/common/Header';
import EventsPageBody from '@components/event/EventsPageBody';
import { checkLoggedIn } from '@utils/helpers/auth';

const EventsPage = () => {
  checkLoggedIn()
  return (<>
    <Head title="Blessings in a Bag" />
    <div style={{ width: '80vw', margin: 'auto' }}>
      <EventsPageBody />
    </div>
  </>)
};

export default EventsPage;
