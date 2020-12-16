import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProfileHeader from '@components/ProfileHeader';
import NotesForAdmin from '@components/NotesForAdmin';
import ContactInformation from '@components/ContactInformation';
import SignUpInformation from '@components/SignUpInformation';
import EventCount from '@components/EventCount';
import AppBar from '@material-ui/core/AppBar';

const defaultUser = {
  name: 'Benjamin Lim',
  volunteerStatus: 'Ad-hoc Volunteer',
  notes: '',
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
      <AppBar />
    </Grid>
    <Grid item container>
      <Grid item md={2} />
      <Grid item container direction="column" xs={12} md={8} spacing={2}>
        <Grid item>
          <ProfileHeader user={defaultUser} />
        </Grid>
        <Grid item container>
          <Grid item xs={12} md={7}>
            <NotesForAdmin user={defaultUser} />
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
