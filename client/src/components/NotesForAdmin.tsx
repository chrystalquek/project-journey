import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const NotesForAdmin = ({ user }) => {

  const desc = user.notes 
    ? user.notes 
    : "No notes written.\nDouble click to leave a note for Admin."

  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography variant='subtitle1'>Notes for Admin</Typography>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      <Grid item>
        <Typography variant='caption'>{desc}</Typography>
      </Grid>
    </Grid>
  )
}

export default NotesForAdmin