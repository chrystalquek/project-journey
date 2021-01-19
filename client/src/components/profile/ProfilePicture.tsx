import { Avatar, Badge, IconButton } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  }
}))

const ProfilePicture = ({ profilePageData }) => {
  const classes = useStyles();

  return (
    <Badge
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      badgeContent={
        <IconButton>
          <Avatar className={classes.button}>
            <PhotoCamera className={classes.icon}/>
          </Avatar>
        </IconButton>
      }
    >
      <Avatar alt={profilePageData.name} className={classes.avatar} src={profilePageData.photoUrl}/>
    </Badge>
  )
}

export default ProfilePicture;