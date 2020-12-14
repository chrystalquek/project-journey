import React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import withSizes from 'react-sizes';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: '#D0DE39',
    height: '70px',
    width: '70px',
  },
  header: {
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  link: {
    color: '#00BADC',
  },
}));

const ProfileHeader = ({ isMobile, user }) => {
  const classes = useStyles();
  const direction = isMobile ? 'column' : 'row';
  const justify = isMobile ? 'center' : 'flex-start';

  return (
    <Grid
      container
      alignItems="center"
      direction={direction}
      justify={justify}
      spacing={2}
      style={{ backgroundColor: '#E5F8FB', padding: '12px' }}
    >
      <Grid item xs={12} sm="auto">
        <Avatar className={classes.avatar}>
          <PersonOutlineIcon style={{ fontSize: 40 }} />
        </Avatar>
      </Grid>
      <Grid item xs={12} sm="auto">
        <Typography variant="h2" className={classes.header}>{user.name}</Typography>
        <Typography className={classes.header}>
          <strong>Volunteer Status:</strong>
          {' '}
          {user.volunteerStatus}
        </Typography>
        <Typography className={`${classes.header} ${classes.link}`}>
          <u>Become a commited volunteer</u>
        </Typography>
      </Grid>
    </Grid>
  );
};

const mapSizesToPros = ({ width }) => ({
  isMobile: width < 600,
});

export default withSizes(mapSizesToPros)(ProfileHeader);
