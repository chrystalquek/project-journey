import { Layout, Menu, Button,} from 'antd';
import Image from 'next/image';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default function NavBar() {
  return (
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: 'fit-content', background: '#fff', borderBottom: '2px solid #EAEAEA' }}>
        <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 24px 0 0', float: 'left' }}>
          <Image alt="Blessings in a Bag" src="/blessings-in-a-bag.png" layout="fill" objectFit="cover" />
        </div>
        <div style={{ position: 'relative', float: 'right', top: '5px' }} >
          <Button type="primary" shape="circle" icon={<UserOutlined />} size="large" />
        </div>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["Home"]}>
          <Menu.Item key="Home">Home</Menu.Item>
          <Menu.Item key="Events">Events</Menu.Item>
        </Menu>
      </Header>
  )
}
