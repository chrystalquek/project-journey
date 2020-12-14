import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const DataRow = ({ header, data , xs1, xs2}) => (
  <Grid container item style={{padding: '5px 0px'}}>
    <Grid item xs={xs1}>
      <Typography ><strong>{header}:</strong></Typography>
    </Grid>
    <Grid item xs={xs2}>
      <Typography>{data}</Typography>
    </Grid>
  </Grid>
)

export default DataRow;