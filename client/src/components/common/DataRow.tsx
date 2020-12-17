import React, { FC }  from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: '5px 0px'
  },
}));

const DataRow = ({
  header, data, xs1, xs2,
}) => {
  const classes = useStyles()

  return (
    <Grid container item className={classes.grid}>
      <Grid item xs={xs1}>
        <Typography>
          <strong>
            {header}
            :
          </strong>
        </Typography>
      </Grid>
      <Grid item xs={xs2}>
        <Typography>{data}</Typography>
      </Grid>
    </Grid>
  );  
}

export default DataRow;
