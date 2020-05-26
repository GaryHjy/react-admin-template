import React from 'react';
import { Form, Input, Button } from 'antd';

const BasicForm = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          {
            type: 'email',
            message: '请输入正确的邮箱格式',
          },
          {
            required: true,
            message: '请输入邮箱地址',
          },
        ]}
      >
        <Input placeholder="请输入" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          保存设置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BasicForm;
