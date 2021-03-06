import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import actions from '@/store/actions/user';
import LoginLayout from '@/layouts/LoginLayout/index';
import styles from './style.module.less';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  onFinish = async form => {
    // 如果在loading证明在请求中，避免回车重复发起请求
    if (this.state.loading) return;
    this.setState({ loading: true });
    try {
      await this.props.loginByUserName(form);
      const { accessToken } = this.props.user;
      // 将accessToken存入sessionStorage
      sessionStorage.setItem('accessToken', accessToken);
      message.success('登录成功');
      this.props.history.push('/');
    } catch {
      // 发生错误取消loading
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <div className={styles.login}>
        <div className={styles.login__header}>登录</div>
        <div className={styles.login__main}>
          <Form className={styles['login-form']} size="large" onFinish={this.onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} allowClear placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            >
              <Input prefix={<LockOutlined />} type="password" allowClear placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles['login-form-button']} loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.user;

const WrappedComponent = connect(mapStateToProps, actions)(Login);

WrappedComponent.Layout = LoginLayout;

export default WrappedComponent;
