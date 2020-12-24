import React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Grid, Typography, Avatar, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import BecomeCommitedDialog from '@components/profile/BecomeCommitedDialog';

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

      {/* Avatar icon */}
      <Grid item xs={12} sm="auto">
        <Avatar className={classes.avatar}>
          <PersonOutlineIcon className={classes.personIcon} />
        </Avatar>
      </Grid>

      {/* User details */}
      <Grid item xs={12} sm="auto">
        <Typography variant="h2" className={classes.header}>{user.name}</Typography>
        <Typography className={classes.header}>
          <strong>Volunteer Status: </strong>
          {user.status}
        </Typography>
        {user.status === 'ad-hoc volunteer'
          ? <BecomeCommitedDialog />
          : null}
      </Grid>
    </Grid>
  );
}
