import React from 'react'
import Grid from '@material-ui/core/Grid'
import MyProfile from './MyProfile'
import NotesForAdmin from './NotesForAdmin'
import ContactInformation from './ContactInformation'
import SignUpInformation from './SignUpInformation'
import EventCount from './EventCount'

const defaultUser = {
  name:"Benjamin Lim",
  volunteerStatus:"Ad-hoc Volunteer",
  notes:"",
  contactNumber:"9695 2546",
  email:"benjaminvolunteer@gmail.com",
  lorem:"lorem ipsum dolor sit amet",
  buddy:"Angeline Soh",
  birthDate:"03/04/1999",
  memberSince:"04/03/2010",
  volunteeringSessions:"4",
  workshops:"2",
  hangouts:"0",
}

const Profile = () => (
  <Grid container direction="column">
    <Grid item>
      This is the header
    </Grid>
    <Grid item container>
      <Grid item xs={1} sm={2} />
      <Grid item container direction="column" xs={12} sm={8} spacing={4}>
        <Grid item>
          <MyProfile user={defaultUser} />
        </Grid>
        <Grid item container spacing={4}>
          <Grid item xs={12} sm={7}>
            <NotesForAdmin user={defaultUser} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <ContactInformation user={defaultUser} />
          </Grid>
          <Grid item xs={12} sm={7}>
            <SignUpInformation user={defaultUser} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <EventCount user={defaultUser} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} sm={2} />
    </Grid>
  </Grid>
)

export default Profile