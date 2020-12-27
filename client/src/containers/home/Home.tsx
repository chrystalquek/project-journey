import { connect } from 'react-redux';
import { StoreState } from '@redux/store';
import Home from '@components/home/Home';

const mapStateToProps = (state: StoreState) => ({
    //   volunteers: state.volunteer,
});

const mapDispatchToProps = (dispatch) => ({
    //   getAllVolunteers: () => dispatch(getAllVolunteers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
