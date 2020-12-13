import {Breadcrumbs, Link, Typography} from "@material-ui/core";

const AdminBreadCrumbs = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/" onClick={() => ""}>
        Material-UI
      </Link>
      <Link color="inherit" href="/getting-started/installation/" onClick={() => ""}>
        Core
      </Link>
      <Typography color="textPrimary">Breadcrumb</Typography>
    </Breadcrumbs>
  )
}

export default AdminBreadCrumbs;