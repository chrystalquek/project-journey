import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, Grid, IconButton, Typography,
} from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ClearIcon from '@material-ui/icons/Clear';
import { useSelector } from 'react-redux';

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
  child: {
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
  container: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
});

const DropZoneCard = ({
  id, initialUrl, isBig, onChangeImage,
}) => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState(initialUrl);

  const handleChange = (e) => {
    const newImageUrl = onChangeImage(e);
    setImageUrl(newImageUrl);
  };

  return (
    <>
      <label htmlFor={id}>
        <Card className={classes.root}>
          {!imageUrl
            ? (
              <Grid item xs={12} container direction="column" alignItems="center" justify="center">
                {/** Padding */}
                <Grid item xs={isBig ? 4 : 3} />

                <Grid item xs={isBig ? 4 : 6} container direction="row" alignItems="center" justify="center">
                  <Grid item container>
                    <>
                      <Grid item container direction="row" justify="center" xs={12}>
                        <AddAPhotoIcon className={classes.icon} />
                      </Grid>
                      <Grid item />
                      <Grid item container direction="row" justify="center" xs={12}>
                        <Typography variant="subtitle1" color="textSecondary" align="center">
                          Browse file to
                          <br />
                          add
                          {isBig ? ' cover ' : ' '}
                          image
                        </Typography>
                      </Grid>
                    </>
                  </Grid>
                </Grid>

                {/** Padding */}
                <Grid item xs={isBig ? 4 : 3} />

              </Grid>
            ) : (
              <Grid container direction="row" alignItems="flex-end" className={classes.container}>
                <Grid item xs={11} className={classes.child}>
                  <img src={imageUrl} alt={imageUrl} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                </Grid>
                <h1>{imageUrl}</h1>
                <Grid item className={classes.overlay}>
                  <IconButton onClick={() => setImageUrl(null)}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>

            )}

        </Card>
      </label>
      <input
        id={id}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </>
  );
};

export default DropZoneCard;
