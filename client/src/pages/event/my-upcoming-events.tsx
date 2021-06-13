import Head from '@components/common/Header';
import { checkLoggedIn } from '@utils/helpers/auth';
import UpcomingEvents from '@components/event/UpcomingEvents/UpcomingEvents';

const UpcomingEventsPage = () => {
  checkLoggedIn();
  return (
    <>
      <Head title="Blessings in a Bag" />
      <div style={{ width: '80vw', margin: 'auto' }}>
        <UpcomingEvents />
      </div>
    </>
  );
};

export default UpcomingEventsPage;
