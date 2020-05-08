import React from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import RenderRoute from '@/components/RenderRoute/index';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/index" exact render={() => <Redirect to="/" />} />
          <Route component={RenderRoute} />
        </Switch>
      </Router>
    );
  }
}

export default App;
