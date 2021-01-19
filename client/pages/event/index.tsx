import Head from '@components/common/Header';
import EventsPageBody from '@containers/event/EventsPageBody';

const EventsPage = () => (
  <>
    <Head title="Blessings in a Bag" />
    <div style={{ width: '80vw', margin: 'auto' }}>
      <EventsPageBody />
    </div>
  </>
);

export default EventsPage;
