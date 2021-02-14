import React, { FC } from 'react';
import styles from '@styles/common/footer.styles';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footerStyle: {
    textAlign: 'center',
    width: '100%',
    marginTop: theme.spacing(4)
  },
}));

const FooterComponent: FC = () => {
  const classes = useStyles();
  
  return (
    <footer className={classes.footerStyle}>
      <Typography variant="body2">Journey © 2021 Created by DSC NUS</Typography>
    </footer>
  );
}

export default FooterComponent;
