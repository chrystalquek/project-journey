import { connect } from 'react-redux';
import getAllVolunteers from '../../actions/volunteer';
import VolunteerProfile from '../../components/volunteer/volunteerProfile';
import { StoreState } from '../../reducers/store';

const mapStateToProps = (state: StoreState) => {
  console.log(state.volunteer);
  return {
    volunteers: state.volunteer
  }
};

const mapDispatchToProps = (dispatch) => ({
  getAllVolunteers: () => dispatch(getAllVolunteers())
});

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerProfile);
