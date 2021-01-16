import { connect } from 'react-redux';
import login, { LoginArgs } from '@redux/actions/user';
import Login from '@components/user/Login';
import { StoreState } from '@redux/store';
import { resetStatus } from '@redux/reducers/user'

const mapStateToProps = (state: StoreState) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  handleFormSubmit: (args: LoginArgs) => dispatch(login(args)),
  resetStatus: () => dispatch(resetStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
