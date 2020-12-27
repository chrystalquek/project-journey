import { connect } from 'react-redux';
import { StoreState } from '@redux/store';
import { getSignedUpEvents, getEvents } from '@redux/actions/event';
import { getSignUps } from '@redux/actions/signup';
import { QueryParams } from 'api/request';
import UpcomingEvent from '@components/home/UpcomingEvent';

const mapStateToProps = (state: StoreState) => ({
    events: state.event,
    signUps: state.signUp,
});

const mapDispatchToProps = (dispatch) => ({
    getSignUps: (query: QueryParams) => dispatch(getSignUps(query)),
    getSignedUpEvents: (query: QueryParams) => dispatch(getSignedUpEvents(query)),
    getEvents: (query: QueryParams) => dispatch(getEvents(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingEvent);
