import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const createRow = (header, data) => (
  <Grid container item>
    <Grid item xs={3}>
      <Typography variant='caption'>{header}</Typography>
    </Grid>
    <Grid item>
      <Typography variant='caption'>{data}</Typography>
    </Grid>
  </Grid>
)

const ContactInformation = ({ user }) => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography variant='subtitle1'>Contact Information</Typography>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      {createRow('Buddy:', user.buddy)}
      {createRow('Date of birth:', user.birthDate)}
      {createRow('Lorem ipsum:', user.lorem)}
      {createRow('Lorem ipsum:', user.lorem)}
      {createRow('Member since:', user.memberSince)}
    </Grid>
  )
}

export default ContactInformation