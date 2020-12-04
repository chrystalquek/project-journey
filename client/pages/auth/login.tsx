import { Form, Input, Button, Checkbox, Layout, Row, Col } from 'antd';
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const { Content } = Layout;

export default function Auth() {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Layout>
            <NavBar />
            <Content style={{ padding: '80px 150px 0px 150px', marginTop: 80, textAlign: 'center', minHeight: '90vh' }}>
                <Row style={{ justifyContent: 'center' }}>
                    <Col span={8}>
                    
                        <Form
                            layout="vertical"
                            name="login"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
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

                            <Form.Item >
                                <Button type="primary" htmlType="submit" disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length}>
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>

                        <div className="section">
                            Don't have an account? <br />
                            <Link href="/auth/signup">
                                <a>Sign up</a>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Content>
            <Footer />
        </Layout >
    )
}