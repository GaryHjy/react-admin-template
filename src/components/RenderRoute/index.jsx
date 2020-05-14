import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import routes from '@/routes';

class RenderRoute extends Component {
  render() {
    return (
      <>
        {routes.map(item => {
          return (
            <Route
              key={item.path}
              path={item.path}
              exact={item.exact}
              render={() => <item.component {...this.props} />}
            />
          );
        })}
      </>
    );
  }
}

export default RenderRoute;
