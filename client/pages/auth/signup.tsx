import { Layout, Menu, Button, Divider, Row, Col, Card } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';
import styles from '../../styles/Auth.module.css';
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

const { Content } = Layout;
const { SubMenu } = Menu;

export default function Signup() {
  return (
    <Layout>
      <NavBar />
      <Content style={{ padding: '80px 150px 0px 150px', marginTop: 80, textAlign: 'center', minHeight: '90vh' }}>
        <div>
          <Row style={{ justifyContent: 'center' }}>
            <Col span={12}>
              <Divider style={{ borderColor: '#D0DE39', borderWidth: 3 }}>
                Sign Up As
              </Divider>
            </Col>
          </Row>
          <div style={{ padding: 24 }}>
            <Row gutter={24} style={{ justifyContent: 'center' }}>
              <Col span={6}>
                <Card hoverable title="Ad-hoc Volunteer" headStyle={{ background: "#D0DE39", color: "#fff", borderRadius: '10px 10px 0px 0px' }} bordered={false} style={{ borderRadius: '10px' }} >
                  You are only intending to volunteer one-off at Blessings in a Bag
              </Card>
              </Col>
              <Col span={6}>
                <Card hoverable title="Regular Volunteer" headStyle={{ background: "#00BADC", color: "#fff", borderRadius: '10px 10px 0px 0px' }} bordered={false} style={{ borderRadius: '10px' }}>
                  You are able to commit to a minimum of 3 months at Blessings in a Bag
              </Card>
              </Col>
            </Row>
          </div>
        </div>

        <div className="section">
          Already have an account? <br />
          <Link href="/auth/login">
            <a>Log in</a>
          </Link>
        </div>
      </Content>
      <Footer />
    </Layout >
  )
}
