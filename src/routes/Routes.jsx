import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './Routes.scss';

import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import Home from '../views/Home/Home';
import Login from '../views/Login/Login';
import Properties from '../views/Properties/Properties';
import Signup from '../views/Signup/Signup';
import AuthContextProvider from '../contexts/AuthContext';
import Property from '../views/Property/Property';

const Routes = () => (
  <Router>
    <AuthContextProvider>
      <Navbar />
      <div className="content">
        <div className="viewport">
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/properties" exact component={Properties} />
          <Route path="/property" exact component={Property} />
        </div>
      </div>
      <Footer />
    </AuthContextProvider>
  </Router>
);

export default Routes;
