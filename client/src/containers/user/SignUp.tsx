import { connect } from 'react-redux';
import { signUp, SignUpArgs } from '@redux/actions/user';
import SignUp from '@components/user/SignUp';
import { StoreState } from '@redux/store';

const mapStateToProps = (state: StoreState) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  handleFormSubmit: (args: SignUpArgs) => dispatch(signUp(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
