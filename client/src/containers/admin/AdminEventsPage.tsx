import { connect } from 'react-redux';
import {StoreState} from "@redux/store";
import {getAdminEvents} from "@redux/actions/admin";
import AdminEventsPage from "@components/admin/AdminEventsPage";

const mapStateToProps = (state: StoreState) => ({
  events: state.admin.adminEvents
});

const mapDispatchToProps = (dispatch) => ({
  getAdminEvents: () => dispatch(getAdminEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminEventsPage);