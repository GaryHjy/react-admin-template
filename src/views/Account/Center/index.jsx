import React from 'react';
import DataMapper from '@/components/DataMapper/index';
import '@/styles/views/account-center.less';

function AccountCenter(props) {
  const columns = [
    {
      label: '用户名',
      key: 'username',
    },
    {
      label: '手机',
      key: 'mobile',
    },
    {
      label: '邮箱',
      key: 'email',
    },
    {
      label: '角色',
      key: 'role',
    },
  ];
  const data = props.store.user.user || {};
  return (
    <div className="account-center">
      <DataMapper title="个人中心" columns={columns} data={data} />
    </div>
  );
}

export default AccountCenter;
