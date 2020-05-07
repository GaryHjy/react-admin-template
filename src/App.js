import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import routes from '@/routes';
import BasicLayout from '@/layouts/BasicLayout/index';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((item) => {
            const Layout = item.layout || BasicLayout;
            return (
              <Route
                key={item.path}
                path={item.path}
                exact={item.exact}
                render={() => (
                  <Layout>
                    <item.Component />
                  </Layout>
                )}
              />
            );
          })}
        </Switch>
      </Router>
    );
  }
}

export default App;
