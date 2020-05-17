import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import routes from '@/routes';

class RenderRoute extends Component {
  render() {
    return (
      <Switch>
        {routes.map(item => {
          return (
            <Route
              key={item.name}
              path={item.path && item.path}
              exact={item.exact}
              render={() => <item.component {...this.props} />}
            />
          );
        })}
        <Redirect to="/404" />
      </Switch>
    );
  }
}

export default RenderRoute;
