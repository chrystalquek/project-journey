import { connect } from 'react-redux';
import login from '../../actions/user';
import Login from '../../components/user/Login';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  handleFormSubmit: (args) => dispatch(login(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
