import {
  Layout,
} from 'antd';
import React, { FC } from 'react';
import styles from '@styles/common/footer.styles';
import { Typography } from '@material-ui/core';

const { Footer } = Layout;

const FooterComponent: FC = () => (
  <Footer style={styles.footer}>
    <Typography variant="body2">Journey © 2021 Created by DSC NUS</Typography>
  </Footer>
);

export default FooterComponent;
