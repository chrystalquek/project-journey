import { connect } from 'react-redux';
import { StoreState } from '@redux/store';
import { getPendingSignUps } from '@redux/actions/signup';
import PendingApproval from '@components/home/PendingApproval';
import { getPendingVolunteers } from '@redux/actions/volunteer';

const mapStateToProps = (state: StoreState) => ({

});

const mapDispatchToProps = (dispatch) => ({
    getPendingSignUps: () => dispatch(getPendingSignUps()),
    getPendingVolunteers: () => dispatch(getPendingVolunteers())
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingApproval);
