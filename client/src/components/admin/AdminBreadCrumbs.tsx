import { Breadcrumbs, Typography } from '@material-ui/core';

const AdminBreadCrumbs = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {/* There isn't any admin/events page, so no <Link> is actually needed... */}
      <Typography color="textPrimary">Events</Typography>
      <Typography color="textPrimary">Search events</Typography>
    </Breadcrumbs>
  )
}

export default AdminBreadCrumbs;
