import { connect } from 'react-redux';
import login, { LoginArgs } from '../../actions/user';
import Login from '../../components/user/Login';
import { StoreState } from '../../reducers/store';

const mapStateToProps = (state: StoreState) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  handleFormSubmit: (args: LoginArgs) => dispatch(login(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
