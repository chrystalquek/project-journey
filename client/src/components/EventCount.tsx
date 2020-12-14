import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const createRow = (header, data) => (
  <Grid container item>
    <Grid item xs={11}>
      <Typography variant='caption'>{header}</Typography>
    </Grid>
    <Grid item xs={1}>
      <Typography variant='caption'>{data}</Typography>
    </Grid>
  </Grid>
)

const EventCount = ({ user }) => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography variant='subtitle1'>Event Count</Typography>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      {createRow('Volunteering Sessions:', user.volunteeringSessions)}
      {createRow('Workshops:', user.workshops)}
      {createRow('Hangouts:', user.hangouts)}
    </Grid>
  )
}

export default EventCount