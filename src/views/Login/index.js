import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '@/styles/views/login.less';

export default class Login extends Component {
  onFinish = (values) => {
    console.log(values);
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="login">
        <div className="login__header">登录</div>
        <div className="login__main">
          <Form className="login-form" size="large" onFinish={this.onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}>
              <Input prefix={<UserOutlined />} allowClear placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}>
              <Input prefix={<LockOutlined />} type="password" allowClear placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
