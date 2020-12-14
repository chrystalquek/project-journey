import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const createRow = (header, data) => (
  <Grid container item>
    <Grid item xs={3}>
      <Typography variant='caption'>{header}</Typography>
    </Grid>
    <Grid item xs={9}>
      <Typography variant='caption'>{data}</Typography>
    </Grid>
  </Grid>
)

const SignUpInformation = ({ user }) => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography variant='subtitle1'>Sign Up Information</Typography>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      {createRow('Buddy:', user.buddy)}
      {createRow('Date of birth:', user.birthDate)}
      {createRow('Lorem:', user.lorem)}
      {createRow('Lorem ipsum:', user.loremIpsum)}
      {createRow('Member since:', user.memberSince)}
    </Grid>
  )
}

export default SignUpInformation