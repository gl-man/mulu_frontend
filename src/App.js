import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from 'components';
import { LoginPage, HomePage, LandingPage } from 'pages';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <PrivateRoute path="/home" component={HomePage} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default App;
