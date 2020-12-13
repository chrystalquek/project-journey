import React from 'react'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: '#D0DE39',
    height: '70px',
    width: '70px',
  },
})

const MyProfile = ({ user }) => {
  const classes = useStyles()

  return (
    <Grid container alignItems='center' spacing={2} style={{backgroundColor:'#E5F8FB', padding:'12px'}}>
      <Grid item>
        <Avatar className={classes.avatar}>
          <PersonOutlineIcon style={{ fontSize: 40 }}/>
        </Avatar>
      </Grid>
      <Grid item>
        <Typography variant='h6'>{user.name}</Typography>
        <Typography variant='caption'>Volunteer Status: {user.volunteerStatus}</Typography><br/>
        <Typography variant='caption'>Become a commited volunteer</Typography>
      </Grid>
    </Grid>
  )
}

export default MyProfile