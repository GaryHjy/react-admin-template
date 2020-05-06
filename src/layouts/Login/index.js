import React from 'react';

const LoginLayout = (prop) => {
  return (
    <div className="login-layout">
      <div>login</div>
      {prop.children}
      <div>footer</div>
    </div>
  );
};

export default LoginLayout;
