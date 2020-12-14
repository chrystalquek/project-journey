import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ProfileDivider from '@components/common/ProfileDivider'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: '#F5F5F5',
    height: '50px',
    padding: '5px 10px',
  },
}))

const NotesForAdmin = ({ user }) => {
  const classes = useStyles()

  const desc = user.notes 
    ? user.notes 
    : "No notes written.\nDouble click to leave a note for Admin."

  return (
    <Grid style={{padding:'20px 20px'}} container direction='column'>
      <Grid item>
        <Typography variant='h4'>Notes for Admin</Typography>
      </Grid>
      <Grid item>
        <ProfileDivider />
      </Grid>
      <Grid item>
        <Paper elevation={0} className={classes.paper}>
          <Typography>{desc}</Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default NotesForAdmin