import {
  Form, Input, Button, Layout, Row, Col,
} from 'antd';
import React, { FC } from 'react';
import Link from 'next/link';
import { useForm } from 'antd/lib/form/Form';
import styles from '../../styles/auth/login.styles';

import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import { LoginArgs } from '../../actions/user';

const { Content } = Layout;

type LoginProps = {
  handleFormSubmit: (formData: LoginArgs) => Promise<void>
}

const Login: FC<LoginProps> = ({
  handleFormSubmit,
}: LoginProps) => {
  const [form] = useForm();

  const isFormDisabled = !form.isFieldsTouched(true)
    || !!form.getFieldsError().filter(({ errors }) => errors.length).length;

  return (
    <Layout>
      <NavBar />
      <Content style={styles.content}>
        <Row style={styles.rowContent}>
          <Col span={8}>
            <Form
              layout="vertical"
              name="login"
              initialValues={{ remember: true }}
              onFinish={handleFormSubmit}
              requiredMark={false}
              className="mb-5"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input placeholder="username@gmail.com" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                className="mb-4"
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isFormDisabled}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>

            <div className="section">
              <div>
                <span>
                  Don&apos;t have an account?
                </span>
              </div>
              <Link href="/auth/signup">
                Sign up
              </Link>
            </div>
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Login;
