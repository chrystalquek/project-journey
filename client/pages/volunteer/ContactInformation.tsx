import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const createRow = (header, data) => (
  <Grid container item>
    <Grid item xs={2}>
      <Typography variant='caption'>{header}</Typography>
    </Grid>
    <Grid item xs={10}>
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
      {createRow('Tel. No.:', user.contactNumber)}
      {createRow('E-mail:', user.email)}
      {createRow('Lorem:', user.lorem)}
    </Grid>
  )
}

export default ContactInformation