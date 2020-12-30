import VolunteerProfile from '@components/volunteer/VolunteerProfile';
import { connect } from 'react-redux';
import { getVolunteers } from '@redux/actions/volunteer';
import { StoreState } from '@redux/store';
import { QueryParams } from '@utils/api/request';

const mapStateToProps = (state: StoreState) => ({
  volunteers: state.volunteer,
});

const mapDispatchToProps = (dispatch) => ({
  getVolunteers: (query: QueryParams) => dispatch(getVolunteers(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerProfile);
