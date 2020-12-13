import {
  Form, Input, Button, Layout, Row, Col,
} from 'antd';
import React, { FC, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'antd/lib/form/Form';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import styles from '@styles/auth/login.styles';

import NavBar from '@components/common/NavBar';
import Footer from '@components/common/Footer';
import { LoginArgs } from '@redux/actions/user';
import { UserState } from '@redux/reducers/user';

const { Content } = Layout;

type LoginProps = {
  user: UserState
  handleFormSubmit: (formData: LoginArgs) => Promise<void>
}

const Login: FC<LoginProps> = ({
  user,
  handleFormSubmit,
}: LoginProps) => {
  const [form] = useForm();
  const router = useRouter();

  const isFormDisabled = !form.isFieldsTouched(true)
    || !!form.getFieldsError().filter(({ errors }) => errors.length).length;

  useEffect(() => {
    if (user.token) {
      router.push('/');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
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
    </>
  );
};

export default Login;
