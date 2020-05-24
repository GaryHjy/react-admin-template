import React from 'react';
import styles from './style.module.less';

const LoginLayout = prop => {
  return (
    <div className={styles['login-layout']}>
      <div className={styles['login-layout__wrapper']}>{prop.children}</div>
    </div>
  );
};

export default LoginLayout;
