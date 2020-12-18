import React, { FC } from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: '10px',
    marginTop: '5px',
  },
}));

const ProfileDivider: FC = () => {
  const classes = useStyles();
  return <Divider className={classes.divider} />;
};

export default ProfileDivider;
