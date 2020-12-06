import {
  Layout, Divider, Row, Col, Card,
} from 'antd';
import Link from 'next/link';
import NavBar from '../../components/common/NavBar';
import Footer from '../../components/common/Footer';

const { Content } = Layout;

export default function Signup() {
  return (
    <Layout>
      <NavBar />
      <Content style={{
        padding: '80px 150px 0px 150px', marginTop: 80, textAlign: 'center', minHeight: '90vh',
      }}
      >
        <div>
          <Row style={{ justifyContent: 'center', textAlign: 'left' }}>
            <Col span={12}>
              <p>
                Yay! We are excited that you are interested to volunteer with us.
                (information to help the users make a decision)
                Please be reminded that there is a minimum commitment of 3 months
                (serving a minimum of 3 sessions a month) in order to have direction
                interaction with our learning community (aged 6 to 16 years old).
                We have this policy for a number of reasons:
                <ul>
                  <li>
                    Limit the emotional trauma in our children that occurs
                    when volunteers come for a few sessions and leave
                  </li>
                  <li>
                    It takes time for children to warm up to
                    new faces and it won&apos;t happen instantly.
                  </li>
                  <li>
                    3 months provides you with the opportunity to witness the progression
                    and impact you&apos;re making (in yourself and in our children)
                  </li>
                  <li>
                    You&apos;ll be journeying with other individuals who share
                    a commitment and passion for our program.  There are opportunities
                    to meet new people and develop friendships.
                  </li>
                  <li>
                    Allows you time to be on-boarded, mentored
                    and guided by some incredible WCA Captains on the team.
                  </li>
                </ul>
              </p>
            </Col>
          </Row>
        </div>
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
                <Card hoverable title="Ad-hoc Volunteer" headStyle={{ background: '#D0DE39', color: '#fff', borderRadius: '10px 10px 0px 0px' }} bordered={false} style={{ borderRadius: '10px' }}>
                  You are only intending to volunteer one-off at Blessings in a Bag
                </Card>
              </Col>
              <Col span={6}>
                <Card hoverable title="Regular Volunteer" headStyle={{ background: '#00BADC', color: '#fff', borderRadius: '10px 10px 0px 0px' }} bordered={false} style={{ borderRadius: '10px' }}>
                  You are able to commit to a minimum of 3 months at Blessings in a Bag
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        <div className="section">
          Already have an account?
          {' '}
          <br />
          <Link href="/auth/login">
            Log in
          </Link>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}
