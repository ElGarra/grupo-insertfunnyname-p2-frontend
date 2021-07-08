import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

import Home from '../views/Home';

const Routes = () => (
  <Router>
    <Navbar />
    <Route path="/" exact component={Home} />
    <Footer />
  </Router>
);

export default Routes;
