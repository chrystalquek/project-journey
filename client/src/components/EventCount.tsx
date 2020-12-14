import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ProfileDivider from '@components/common/ProfileDivider'
import DataRow from '@components/common/DataRow'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  link: {
    color: '#00BADC'
  }
}))

const EventCount = ({ user }) => {
  const classes = useStyles()

  return (
    <Grid style={{padding:'20px 20px'}} container direction='column'>
      <Grid item>
        <Typography variant='h4'>Event Count</Typography>
      </Grid>
      <Grid item>
        <ProfileDivider />
      </Grid>
      <DataRow header='Volunteering Sessions' data={user.volunteeringSessions} xs1={11} xs2={1}/>
      <DataRow header='Workshops' data={user.workshops} xs1={11} xs2={1}/>
      <DataRow header='Hangouts' data={user.hangouts} xs1={11} xs2={1}/>
      <Grid item>
        <Typography className={classes.link}><u>View past events</u></Typography>
      </Grid>
    </Grid>
  )
}

export default EventCount