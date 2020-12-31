import { connect } from 'react-redux';
import { signup, SignupArgs } from '@redux/actions/user';
import Signup from '@components/user/Signup';
import { StoreState } from '@redux/store';

const mapStateToProps = (state: StoreState) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  handleFormSubmit: (args: SignupArgs) => dispatch(signup(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
