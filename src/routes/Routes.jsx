import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Route } from 'react-router-dom';

import './Routes.scss';

import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import Home from '../views/Home/Home';
import Login from '../views/Login/Login';
import Properties from '../views/Properties/Properties';
import Signup from '../views/Signup/Signup';
import AuthContextProvider from '../contexts/AuthContext';
import ReportContextProvider from '../contexts/ReportContext';
import Property from '../views/Property/Property';
import Profile from '../views/Profile/Profile';
import Meeting from '../views/Meeting/Meeting';
import Admin from '../views/Admin/Admin';

const Routes = () => (
  <AuthContextProvider>
    <ReportContextProvider>
      <Navbar />
      <div className="content">
        <div className="viewport">
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/properties" exact component={Properties} />
          <Route path="/properties/:propertyId" exact component={Property} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/meetings/:meetingId" exact component={Meeting} />
          <Route path="/admin" exact component={Admin} />
        </div>
      </div>
      <Footer />
    </ReportContextProvider>
  </AuthContextProvider>
);

export default Routes;
