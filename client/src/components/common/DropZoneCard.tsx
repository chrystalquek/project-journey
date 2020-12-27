import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, Grid, Typography, IconButton,
} from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const useStyles = makeStyles({
  card: {
    boxShadow: 'none',
    border: '1px dashed #545454',
    borderRadius: '10px',
  },
});

const DropZoneCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Grid container direction="row" alignItems="center" justify="center" spacing={2}>
        <Grid item xs={12} />
        <Grid item container direction="row" justify="center" xs={12}>
          <AddAPhotoIcon />
        </Grid>
        <Grid item container direction="row" justify="center" xs={12}>
          <Typography variant="subtitle1" color="textSecondary">
            Browse file to add cover image
          </Typography>
        </Grid>
        <Grid item xs={12} />
      </Grid>
    </Card>
  );
};

export default DropZoneCard;
