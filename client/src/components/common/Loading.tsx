import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { StoreState } from '@redux/store';
import ErrorPage from 'next/error';

const useStyles = makeStyles((theme) => ({
  centralize: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const Loading = () => {
  const classes = useStyles();
  const status = useSelector((state: StoreState) => state.loading.status);

  return status === 'failed'
    ? <ErrorPage statusCode={404} />
    : (
      <div className={classes.centralize}>
        <CircularProgress />
      </div>
    );
};

export default Loading;
