import React from 'react';
import { Form, Input, Button } from 'antd';
import styles from './style.module.less';

const BasicForm = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log(values);
  };

  return (
    <div className={styles['basic-form']}>
      <Form form={form} layout="vertical" name="setting" onFinish={onFinish} initialValues={{}} scrollToFirstError>
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

        <Form.Item name="nickName" label="昵称">
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存设置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BasicForm;
