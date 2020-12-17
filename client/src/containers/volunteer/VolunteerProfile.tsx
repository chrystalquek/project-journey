import VolunteerProfile from '@components/volunteer/VolunteerProfile';
import { connect } from 'react-redux';
import getAllVolunteers from '@redux/actions/volunteer';
import { StoreState } from '@redux/store';

const mapStateToProps = (state: StoreState) => ({
  volunteers: state.volunteer,
});

const mapDispatchToProps = (dispatch) => ({
  getAllVolunteers: () => dispatch(getAllVolunteers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerProfile);
