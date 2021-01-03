import { Breadcrumbs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  linkColor: {
    color: '#595858',
    lineHeight: '2rem',
  },
});

const EventBreadCrumbs = () => {
  const classes = useStyles();

  return (
    <Breadcrumbs separator=">" className={classes.linkColor} aria-label="breadcrumb">
      {/* There isn't any admin/events page, so no <Link> is actually needed... */}
      <Typography>Events</Typography>
      <Typography>Search events</Typography>
    </Breadcrumbs>
  );
};

export default EventBreadCrumbs;
