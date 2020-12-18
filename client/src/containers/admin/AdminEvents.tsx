import { connect } from 'react-redux';
import {StoreState} from "@redux/store";
import {getAdminEvents} from "@redux/actions/admin";
import AdminEvents from "@components/admin/AdminEvents";

const mapStateToProps = (state: StoreState) => {
  return { adminEvents: state.admin.adminEvents }
};

const mapDispatchToProps = (dispatch) => ({
  getAdminEvents: () => dispatch(getAdminEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminEvents);