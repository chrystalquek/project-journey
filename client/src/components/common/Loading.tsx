import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  centralize: {
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)'
  }
}));


const Loading = () => {
  const classes = useStyles()

  return (
    <div className={classes.centralize}>
      <CircularProgress />
    </div>
  )
}

export default Loading