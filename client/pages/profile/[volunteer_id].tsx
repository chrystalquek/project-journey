import React from 'react';
import { Grid } from '@material-ui/core';
import ProfileHeader from '@components/profile/ProfileHeader';
import Remarks from '@components/profile/Remarks';
import ContactInformation from '@components/profile/ContactInformation';
import SignUpInformation from '@components/profile/SignUpInformation';
import EventCount from '@components/profile/EventCount';
import NavBar from '@components/common/NavBar';
import { useSelector } from 'react-redux';
import { StoreState } from '@redux/store';
import dummyUser from '@utils/constants/dummyUser';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { VOLUNTEER_TYPE } from '@type/volunteer';

const Profile = () => {
  const router = useRouter();

  // secret sample page
  const isDummyPage = (router.query.volunteer_id === dummyUser.user._id);
  const userData = isDummyPage ? dummyUser : useSelector((state: StoreState) => state.user);

  if (userData.user === null) {
    return <ErrorPage statusCode={404} />;
  }

  if (userData.user.volunteerType !== VOLUNTEER_TYPE.ADMIN
    && userData.user._id !== router.query.volunteer_id) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <NavBar userData={userData.user} />
      </Grid>
      <Grid item container>
        <Grid item md={2} />
        <Grid item container direction="column" xs={12} md={8}>
          <Grid item>
            <ProfileHeader user={userData.user} />
          </Grid>
          <Grid item container>
            <Grid item xs={12} md={7}>
              <Remarks user={userData.user} />
            </Grid>
            <Grid item xs={12} md={5}>
              <ContactInformation user={userData.user} />
            </Grid>
            <Grid item xs={12} md={7}>
              <SignUpInformation user={userData.user} />
            </Grid>
            <Grid item xs={12} md={5}>
              <EventCount user={userData.user} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2} />
      </Grid>
    </Grid>
  );
};
export default Profile;
