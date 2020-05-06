import React from 'react';

const DefaultLayout = (prop) => {
  return (
    <div className="default-layout">
      <div>header</div>
      {prop.children}
      <div>footer</div>
    </div>
  );
};

export default DefaultLayout;
