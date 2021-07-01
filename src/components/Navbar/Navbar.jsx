import React from 'react';
import './Navbar.scss';

const Navbar = () => (
  <body>
    <header>
      <nav className="navbar">
        <div id="brand-container">
          <div className="brand">
            <div className="logo">
              <a href="/">
                <img src="homylogo.png" alt="Logo" />
              </a>
            </div>
            <div className="word-mark" id="navbar-word-mark">
              <a href="/">TrippieBook</a>
            </div>
          </div>
          <div className="title-mark" id="navbar-title-mark">
            <p> Enjoy your Travels!</p>
          </div>
        </div>
        <div id="menu-container">
          <ul>
            <li id="profile-picture-container">
              <img
                id="profile-picture"
                src="https://ih0.redbubble.net/image.846505062.7003/flat,1000x1000,075,f.jpg"
                alt="Profile"
              />
            </li>
            <li>
              <p> Userman </p>
            </li>
          </ul>
        </div>
      </nav>
      <div className="navbar-offset"> </div>
    </header>
  </body>
);

export default Navbar;
