import { connect } from 'react-redux';
import { StoreState } from '@redux/store';
import Home from '@components/home/Home';

const mapStateToProps = (state: StoreState) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
