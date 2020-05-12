import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '@/styles/views/login.less';
import { loginByUserName } from '@/services/api/user';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  onFinish = form => {
    this.setState({ loading: true });
    loginByUserName(form)
      .then(res => {
        console.log(res.data);
        message.success('登录成功');
        setTimeout(() => {
          this.props.history.push('/');
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      })
      .catch(e => console.log(e));
  };

  render() {
    const { loading } = this.state;
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
              <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
