import { connect } from 'react-redux';
import { StoreState } from '@redux/store';
import { getAllEvents } from '@redux/actions/event';
import EventsPageBody from '@components/event/EventsPageBody';

const mapStateToProps = (state: StoreState) => ({
  events: state.event.events,
});

const mapDispatchToProps = (dispatch) => ({
  getAdminEvents: () => dispatch(getAllEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsPageBody);
