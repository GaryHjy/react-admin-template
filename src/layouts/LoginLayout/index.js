import React from 'react';
import '@/styles/layout-styles/login-layout';

const LoginLayout = prop => {
  return (
    <div className="login-layout">
      <div className="login-layout__wrapper">{prop.children}</div>
    </div>
  );
};

export default LoginLayout;
