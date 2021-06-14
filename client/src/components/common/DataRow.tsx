// IGNORE
import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  grid: {
    padding: '5px 0px',
  },
}));

type Props = {
  header: string,
  data: string,
  // xs1 is column width of the row header
  xs1: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  // xs2 is column width of the row data
  xs2: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

const DataRow: FC<Props> = ({
  header, data, xs1, xs2,
}) => {
  const classes = useStyles();

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
};

export default DataRow;
