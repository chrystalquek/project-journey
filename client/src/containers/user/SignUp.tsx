import { connect } from 'react-redux';
import { signUp } from '@redux/actions/user';
import SignUp from '@components/user/SignUp';
import { StoreState } from '@redux/store';
import { VolunteerData } from '@type/volunteer';

const mapStateToProps = (state: StoreState) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  handleFormSubmit: (args: VolunteerData) => dispatch(signUp(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
