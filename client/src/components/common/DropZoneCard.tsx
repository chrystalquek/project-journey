import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
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
  clearIcon: {
    color: theme.palette.primary.main,
  },
  overlayIcon: {
    position: 'absolute',
    left: '50%',
    top: '43%',
    transform: 'translate(-50%, -50%)',
  },
  overlayText: {
    position: 'absolute',
    left: '50%',
    top: '58%',
    transform: 'translate(-50%, -50%)',
    color: '#D8D8D8', // grey
  },
}));

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
        <div className={classes.root}>
          {!imageUrl
            ? (
              <div className={classes.container}>
                <div className={classes.overlayIcon}>
                  <AddAPhotoIcon className={classes.icon} />
                </div>
                <div className={classes.overlayText}>
                  <Typography variant="subtitle1" align="center">
                    Browse file to
                    <br />
                    add
                    {isBig ? ' cover ' : ' '}
                    image
                  </Typography>
                </div>
              </div>
            ) : (
              <div className={classes.container}>
                <div className={classes.child}>
                  <img src={imageUrl} alt={imageUrl} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                </div>
                <div className={classes.overlay}>
                  <IconButton
                    onClick={() => setImageUrl(null)}
                    className={classes.clearIcon}
                  >
                    <ClearIcon fontSize="default" />
                  </IconButton>
                </div>
              </div>
            )}

        </div>
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
