import { Avatar, Badge, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, useMediaQuery } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { PhotoCamera } from '@material-ui/icons';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const useStyles = makeStyles((theme) => ({
  button: {
    width: 24,
    height: 24,
  },
  icon: {
    width: 16,
    height: 16,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: '100px',
    width: '100px',
  },
  input: {
    display: 'none'
  },
  image: {
    maxWidth: '50%',
  }
}))

const ProfilePicture = ({ profilePageData }) => {
  const classes = useStyles();

  const [src, setSrc] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 30,
    aspect: 1/1
  })

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));


  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSrc(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const onImageLoaded = (image) => {
    console.log(`onImageLoaded called ${image}`)
    setImageRef(image);
  }

  const onCropComplete = (newCrop) => {
    console.log('onCropComplete called')
    console.log(newCrop)
  }

  const onCropChange = (newCrop) => {
    console.log('onCropChange called')
    setCrop(newCrop)
  }

  const handleClose = useCallback(() => {
    console.log(`before closing: ${src}`)
    setSrc(null);
    console.log(`after closing: ${src}`)
  }, [open]);

  return (
    <div>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        badgeContent={
          <div>
            <label htmlFor='file-input'>
              <Avatar className={classes.button}>
                <PhotoCamera className={classes.icon}/>
              </Avatar>
            </label>
            <input 
              id='file-input' 
              className={classes.input} 
              type="file" 
              accept="image/jpg, image/png"
              onChange={onSelectFile} 
            />
          </div>
        }
      >
        <Avatar alt={profilePageData.name} className={classes.avatar} src={profilePageData.photoUrl}/>
      </Badge>
      <Dialog
        open={src !== null}
        fullScreen={isMobile}
        onClose={handleClose}
        fullWidth 
      >
        <DialogTitle>
          Update Profile Picture
        </DialogTitle>
        <DialogContent>
          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              ruleOfThirds
              circularCrop
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
              onChange={onCropChange}
              imageStyle={{ maxWidth: "75%" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProfilePicture;