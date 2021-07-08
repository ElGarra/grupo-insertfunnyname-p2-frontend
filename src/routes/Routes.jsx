import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import Home from '../views/Home';
import Login from '../views/Login';
import Properties from '../views/Properties';
import Signup from '../views/Signup';

const Routes = () => (
  <Router>
    <Navbar />
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/properties" exact component={Properties} />
    <Footer />
  </Router>
);

export default Routes;
