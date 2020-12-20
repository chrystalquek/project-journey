import VolunteerProfile from '@components/volunteer/VolunteerProfile';
import { connect } from 'react-redux';
import { getVolunteers } from '@redux/actions/volunteer';
import { StoreState } from '@redux/store';

const mapStateToProps = (state: StoreState) => ({
  volunteers: state.volunteer,
});

const mapDispatchToProps = (dispatch) => ({
  getVolunteers: (pageNo: number, size: number, volunteerType: string) => dispatch(getVolunteers({ pageNo, size, volunteerType }))
});

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerProfile);
