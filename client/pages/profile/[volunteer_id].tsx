import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import ProfileHeader from '@components/profile/ProfileHeader';
import Remarks from '@components/profile/Remarks';
import ContactInformation from '@components/profile/ContactInformation';
import SignUpInformation from '@components/profile/SignUpInformation';
import EventCount from '@components/profile/EventCount';
import NavBar from '@components/common/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@redux/store';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { VOLUNTEER_TYPE } from '@type/volunteer';
import { getVolunteerById } from '@redux/actions/profilePage';

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const profilePageId = router.query.volunteer_id as string

  const loggedInUser = useSelector((state: StoreState) => state.user);
  const profilePageData = useSelector((state: StoreState) => state.profilePage.data);

  // Guard clause, user cannot view other users
  // Only admin can view other users
  if (loggedInUser.user === null
    || loggedInUser.user.volunteerType !== VOLUNTEER_TYPE.ADMIN
    && loggedInUser.user._id !== profilePageId) {
    return <ErrorPage statusCode={404} />;
  }

  // Get the profilePageData if it's not loaded yet
  if (profilePageData === null || profilePageData?._id !== profilePageId) {
    dispatch(getVolunteerById(profilePageId))
    return <CircularProgress />
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <NavBar userData={profilePageData} />
      </Grid>
      <Grid item container>
        <Grid item md={2} />
        <Grid item container direction="column" xs={12} md={8}>
          <Grid item>
            <ProfileHeader user={profilePageData} />
          </Grid>
          <Grid item container>
            <Grid item xs={12} md={7}>
              <Remarks user={profilePageData} />
            </Grid>
            <Grid item xs={12} md={5}>
              <ContactInformation user={profilePageData} />
            </Grid>
            <Grid item xs={12} md={7}>
              <SignUpInformation user={profilePageData} />
            </Grid>
            <Grid item xs={12} md={5}>
              <EventCount user={profilePageData} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2} />
      </Grid>
    </Grid>
  );
};
export default Profile;
