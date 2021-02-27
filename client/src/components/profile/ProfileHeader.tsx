import React, { FC } from 'react';
import {
  Grid, Typography, Avatar, useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import BecomeCommitedDialog from '@components/profile/BecomeCommitedDialog';
import { VolunteerData, VOLUNTEER_TYPE } from '@type/volunteer';
import { useSelector } from 'react-redux';
import { StoreState } from '@redux/store';
import ProfilePicture from './ProfilePicture';
import ApproveCommitmentApplication from './ApproveCommitmentApplication';
import { CommitmentApplicationStatus } from '@type/commitmentApplication';

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
  profilePageData: VolunteerData
}

const ProfileHeader: FC<props> = ({ profilePageData }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const direction = isMobile ? 'column' : 'row';
  const justify = isMobile ? 'center' : 'flex-start';
  const user = useSelector((state: StoreState) => state.user);
  const userData = user?.user;

  const length = profilePageData?.commitmentApplicationIds.length 
  const commitmentApplication: any = length > 0 
    ? profilePageData.commitmentApplicationIds[length-1]
    : null

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
        <ProfilePicture profilePageData={profilePageData} />
      </Grid>

      {/* User details */}
      <Grid item xs={12} sm="auto">
        <Typography variant="h2" className={classes.header}>{profilePageData.name}</Typography>
        <Typography className={classes.header}>
          <strong>Volunteer Type: </strong>
          {profilePageData?.volunteerType?.toString()}
        </Typography>
        {/* Only shows the option to become committed if the loggedInUser
        is viewing own profile and is still an adhoc volunteer */}
        { profilePageData.volunteerType === VOLUNTEER_TYPE.ADHOC
        && userData.email === profilePageData.email
        && <BecomeCommitedDialog commitmentApplication={commitmentApplication}/> }
        {/* Approval button if loggedInUser is admin and volunteerProfile
        has a pending commitmentApplication*/}
        { userData.volunteerType === VOLUNTEER_TYPE.ADMIN 
        && commitmentApplication.status === CommitmentApplicationStatus.Pending
        && <ApproveCommitmentApplication commitmentApplication={commitmentApplication}/>}
      </Grid>
    </Grid>
  );
};

export default ProfileHeader;
