import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ProfileDivider from '@components/common/ProfileDivider'
import DataRow from '@components/common/DataRow'

const ContactInformation = ({ user }) => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography variant='h4'>Contact Information</Typography>
      </Grid>
      <Grid item>
        <ProfileDivider />
      </Grid>
      <DataRow header='Tel. No.' data={user.contactNumber} xs1={3} xs2={9}/>
      <DataRow header='E-mail' data={user.email} xs1={3} xs2={9}/>
      <DataRow header='Lorem' data={user.lorem} xs1={3} xs2={9}/>
    </Grid>
  )
}

export default ContactInformation