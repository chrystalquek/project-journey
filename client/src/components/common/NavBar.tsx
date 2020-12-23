import { Layout, Menu, Button } from 'antd';
import Image from 'next/image';
import { UserOutlined } from '@ant-design/icons';
import { FC } from 'react';
import styles from '@styles/common/navbar.styles';
import { useRouter } from 'next/dist/client/router';

const { Header } = Layout;

const NavBar: FC = () => {
  const router = useRouter();

  return (
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
        <Menu.Item key="Volunteers" onClick={() => router.push('/volunteer')}>Volunteers</Menu.Item>
        {/* TODO: hide for regular volunteers */}
      </Menu>
    </Header>
  );
};
``
export default NavBar;
