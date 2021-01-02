import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, Grid, Typography, IconButton,
} from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Axios from 'axios';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    boxShadow: 'none',
    border: '1px dashed #545454', // grey
    height: '100%',
    width: '100%',
  },
  icon: {
    color: '#D8D8D8', // grey
  },
});

const DropZoneCard = (prop) => {
  const classes = useStyles();

  return (
    <>
      <label htmlFor="image">
        <Card className={classes.root}>
          <Grid item xs={12} container direction="column" alignItems="center" justify="center">
            {/** Padding */}
            <Grid item xs={prop.isBig ? 4 : 3} />

            {/** Content */}
            <Grid item xs={prop.isBig ? 4 : 6} container direction="row" alignItems="center" justify="center">
              <Grid item container>
                <Grid item container direction="row" justify="center" xs={12}>
                  <AddAPhotoIcon className={classes.icon} />
                </Grid>
                <Grid item />
                <Grid item container direction="row" justify="center" xs={12}>
                  <Typography variant="subtitle1" color="textSecondary" align="center">
                    Browse file to
                    <br />
                    add
                    {prop.isBig ? ' cover ' : ' '}
                    image
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/** Padding */}
            <Grid item xs={prop.isBig ? 4 : 3} />

          </Grid>

        </Card>
      </label>
      <input
        id="image"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={prop.onUploadImage}
      />
    </>
  );
};

export default DropZoneCard;
