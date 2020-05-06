import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import routes from '@/routes';
import DefaultLayout from '@/layouts/Default/index';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((item) => {
            const Layout = item.layout || DefaultLayout;
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
