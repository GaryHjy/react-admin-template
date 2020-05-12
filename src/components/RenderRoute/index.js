import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import routes from '@/routes';
import BasicLayout from '@/layouts/BasicLayout/index';

class RenderRoute extends Component {
  render() {
    return (
      <>
        {routes.map(item => {
          const Layout = item.layout || BasicLayout;
          return (
            <Route
              key={item.path}
              path={item.path}
              exact={item.exact}
              render={() => (
                <Layout>
                  <item.component {...this.props} />
                </Layout>
              )}
            />
          );
        })}
      </>
    );
  }
}

export default RenderRoute;
