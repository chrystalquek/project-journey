import { Layout, Menu, Button } from 'antd';
import Image from 'next/image';
import { UserOutlined } from '@ant-design/icons';
import { FC } from 'react';
import styles from '../../../styles/common/navbar.styles';

const { Header } = Layout;

const NavBar: FC = () => (
  <Header style={styles.header}>
    <div style={styles.imageContainer}>
      <Image alt="Blessings in a Bag" src="/blessings-in-a-bag.png" layout="fill" objectFit="cover" />
    </div>
    <div style={styles.buttonContainer}>
      <Button type="primary" shape="circle" icon={<UserOutlined />} size="large" />
    </div>
    <Menu theme="light" mode="horizontal" defaultSelectedKeys={['Home']}>
      <Menu.Item key="Home">Home</Menu.Item>
      <Menu.Item key="Events">Events</Menu.Item>
    </Menu>
  </Header>
);

export default NavBar;
