import {
  Layout,
} from 'antd';
import { FC } from 'react';
import styles from '@styles/common/footer.styles';

const { Footer } = Layout;

const FooterComponent: FC = () => (
  <Footer style={styles.footer}>Journey © 2021 Created by DSC NUS</Footer>
);

export default FooterComponent;
