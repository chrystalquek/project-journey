import React, { FC } from 'react';
import {
  Grid, Typography, useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import BecomeCommitedDialog from '@components/profile/BecomeCommitedDialog';
import { VolunteerData, VolunteerType } from '@type/volunteer';
import { CommitmentApplicationStatus } from '@type/commitmentApplication';
import { useAppSelector } from '@redux/store';
import ProfilePicture from './ProfilePicture';
import ApproveCommitmentApplication from './ApproveCommitmentApplication';
import ChangeVolunteerType from './ChangeVolunteerType';

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
  const user = useAppSelector((state) => state.user);
  const userData = user?.user;

  const length = profilePageData?.commitmentApplicationIds?.length;
  const commitmentApplication: any = length
    ? profilePageData.commitmentApplicationIds[length - 1]
    : null;

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
        <Grid item container alignItems="center">
          <Grid item>
            <Typography className={classes.header}>
              <strong>Volunteer Type: </strong>
              {profilePageData?.volunteerType?.toString()}
            </Typography>
          </Grid>
          <Grid item>
            {userData.volunteerType === VolunteerType.ADMIN
              && <ChangeVolunteerType />}
          </Grid>
        </Grid>
        {/* Only shows the option to become committed if the loggedInUser
        is viewing own profile and is still an adhoc volunteer */}
        {profilePageData.volunteerType === VolunteerType.ADHOC
          && userData.email === profilePageData.email
          && <BecomeCommitedDialog />}
        {/* Approval button if loggedInUser is admin and volunteerProfile
        has a pending commitmentApplication */}
        {userData.volunteerType === VolunteerType.ADMIN
          && commitmentApplication?.status === CommitmentApplicationStatus.Pending
          && <ApproveCommitmentApplication commitmentApplication={commitmentApplication} />}
      </Grid>
    </Grid>
  );
};

export default ProfileHeader;
