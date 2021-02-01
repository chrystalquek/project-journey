import { Avatar, Badge, Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { PhotoCamera } from '@material-ui/icons';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDispatch } from 'react-redux';
import { updateProfilePicture, uploadImage } from '@redux/actions/image';

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
    objectFit: 'cover'
  },
  input: {
    display: 'none'
  },
}))

const ProfilePicture = ({ profilePageData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  var fileUrl = "";
  const [src, setSrc] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState("");
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
    setImageRef(image);
  }

  const onCropComplete = (newCrop) => {
    makeClientCrop(newCrop);
  }

  const onCropChange = (newCrop) => {
    setCrop(newCrop)
  }

  const makeClientCrop = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
      );
      setNewImageUrl(croppedImageUrl);
    }
  }

  const getCroppedImg = async (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise<string>((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        window.URL.revokeObjectURL(fileUrl);
        fileUrl = window.URL.createObjectURL(blob);
        resolve(fileUrl);
      }, 'image/jpeg');
    });   
  }

  const handleSave = async () => {
    const FormData = require('form-data');
    const blob = await fetch(newImageUrl).then(res => res.blob());
    const metadata = { type: 'image/jpeg' }
    const imageFile = new File([blob], `profile.jpg`, metadata)

    const form = new FormData();
    form.append('image', imageFile);
    form.append('email', profilePageData.email);

    dispatch(updateProfilePicture(form))
    setSrc(null);
  }

  const handleCancel = useCallback(() => {
    setSrc(null);
  }, [src]);

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
        onClose={handleCancel}
        scroll={'body'}
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
              style={{ maxWidth: "100%" }}
              imageStyle={{ maxWidth: "100%" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ProfilePicture;