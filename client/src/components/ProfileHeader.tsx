import React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
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
    color: theme.palette.secondary.main,
  },
  grid: {
    backgroundColor: theme.palette.secondary.light,
    padding: '12px',
  },
  personIcon: {
    fontSize: 40,
  },
}));

export default function ProfileHeader({ user }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const direction = isMobile ? 'column' : 'row';
  const justify = isMobile ? 'center' : 'flex-start';

  return (
    <Grid
      container
      alignItems="center"
      direction={direction}
      justify={justify}
      spacing={2}
      className={classes.grid}
    >
      <Grid item xs={12} sm="auto">
        <Avatar className={classes.avatar}>
          <PersonOutlineIcon className={classes.personIcon} />
        </Avatar>
      </Grid>
      <Grid item xs={12} sm="auto">
        <Typography variant="h2" className={classes.header}>{user.name}</Typography>
        <Typography className={classes.header}>
          <strong>Volunteer Status: </strong>
          {user.volunteerStatus}
        </Typography>
        <Typography className={`${classes.header} ${classes.link}`}>
          <u>Become a commited volunteer</u>
        </Typography>
      </Grid>
    </Grid>
  );
};
