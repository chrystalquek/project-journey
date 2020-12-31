import React, { FC } from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import {
  Grid, Typography, Avatar, useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import BecomeCommitedDialog from '@components/profile/BecomeCommitedDialog';
import { VolunteerData, VOLUNTEER_TYPE } from '@type/volunteer';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: '100px',
    width: '100px',
  },
  header: {
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  grid: {
    backgroundColor: theme.palette.secondary.light,
    padding: '20px',
  },
  personIcon: {
    fontSize: 60,
  },
}));

type props = {
  user: VolunteerData
}

const ProfileHeader: FC<props> = ({ user }) => {
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
        <Avatar alt={user.name} className={classes.avatar} src={user.photoUrl} />
      </Grid>

      {/* User details */}
      <Grid item xs={12} sm="auto">
        <Typography variant="h2" className={classes.header}>{user.name}</Typography>
        <Typography className={classes.header}>
          <strong>Volunteer Type: </strong>
          {user.volunteerType.toString()}
        </Typography>
        { user.volunteerType === VOLUNTEER_TYPE['ad-hoc'] && <BecomeCommitedDialog /> }
      </Grid>
    </Grid>
  );
}

export default ProfileHeader