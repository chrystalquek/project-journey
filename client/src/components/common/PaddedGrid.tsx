import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  grid: {
    padding: '20px 20px',
  },
}));

const PaddedGrid: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.grid} container direction="column">
      {children}
    </Grid>
  );
};

export default PaddedGrid;
