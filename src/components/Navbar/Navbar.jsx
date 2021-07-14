import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.scss';

import useAuth from '../../hooks/useAuth';
import Button from '../BaseButton/BaseButton';

const Navbar = () => {
  const { currentUser, handleUserLogout } = useAuth();

  return (
    <>
      <header className="Navbar">
        <nav>
          <div>
            <div className="brand">
              <div className="logo">
                <Link to="/">
                  <img src="/logo-brand.png" alt="Logo" />
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div> </div>
          </div>
          {currentUser ? (
            <div>
              <div className="button-container">
                <Link to="/profile">
                  <Button>My profile</Button>
                </Link>
              </div>
              <div className="button-container">
                <Button onClick={handleUserLogout}>Log Out</Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="button-container">
                <Link to="/login">
                  <Button>Log In</Button>
                </Link>
              </div>
              <div className="button-container">
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
      <div className="navbar-offset" />
    </>
  );
};

export default Navbar;
