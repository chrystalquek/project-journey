import React from 'react';
import { Grid, AppBar } from '@material-ui/core';
import ProfileHeader from '@components/profile/ProfileHeader';
import Remarks from '@components/profile/Remarks';
import ContactInformation from '@components/profile/ContactInformation';
import SignUpInformation from '@components/profile/SignUpInformation';
import EventCount from '@components/profile/EventCount';
import NavBar from '@components/common/NavBar';

const defaultUser = {
  name: 'Benjamin Lim',
  status: 'ad-hoc volunteer',
  volunteerRemarks: '',
  adminRemarks: 'Ben & jerry',
  contactNumber: '9695 2546',
  email: 'benjaminvolunteer@gmail.com',
  lorem: 'lorem ipsum dolor sit amet',
  loremIpsum: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  buddy: 'Angeline Soh',
  birthDate: '03/04/1999',
  memberSince: '04/03/2010',
  volunteeringSessions: '4',
  workshops: '2',
  hangouts: '0',
};

const Profile = () => (
  <Grid container direction="column">
    <Grid item>
      <NavBar userData={null} />
    </Grid>
    <Grid item container>
      <Grid item md={2} />
      <Grid item container direction="column" xs={12} md={8}>
        <Grid item>
          <ProfileHeader user={defaultUser} />
        </Grid>
        <Grid item container>
          <Grid item xs={12} md={7}>
            <Remarks user={defaultUser} />
          </Grid>
          <Grid item xs={12} md={5}>
            <ContactInformation user={defaultUser} />
          </Grid>
          <Grid item xs={12} md={7}>
            <SignUpInformation user={defaultUser} />
          </Grid>
          <Grid item xs={12} md={5}>
            <EventCount user={defaultUser} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={2} />
    </Grid>
  </Grid>
);

export default Profile;
