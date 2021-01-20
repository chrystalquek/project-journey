import { Avatar, Badge, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, useMediaQuery } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { PhotoCamera } from '@material-ui/icons';

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
  }
}))

const ProfilePicture = ({ profilePageData }) => {
  const classes = useStyles();

  const[open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
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
            <input id='file-input' className={classes.input} type="file" accept="image/jpg, image/png" />
          </div>
        }
      >
        <Avatar alt={profilePageData.name} className={classes.avatar} src={profilePageData.photoUrl}/>
      </Badge>
      <Dialog
        open={open}
        fullScreen={isMobile}
        onClose={handleClose}
        fullWidth 
      >
        <DialogTitle>
          Update Profile Picture
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column">
            <Grid item >
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ProfilePicture;