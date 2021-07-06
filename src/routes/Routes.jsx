import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../views/Home/Home';

const Routes = () => (
  <Router>
    <Route path="/" exact component={Home} />
  </Router>
);

export default Routes;
