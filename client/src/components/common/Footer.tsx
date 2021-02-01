import React, { FC } from 'react';
import styles from '@styles/common/footer.styles';
import { Typography } from '@material-ui/core';

const FooterComponent: FC = () => (
  <footer style={styles.footer}>
    <Typography variant="body2">Journey © 2021 Created by DSC NUS</Typography>
  </footer>
);

export default FooterComponent;
