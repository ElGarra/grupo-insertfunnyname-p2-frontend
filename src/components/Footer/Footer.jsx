import React from 'react';
import './Footer.scss';

const Footer = () => (
  <footer className="Footer">
    <div id="logo-footer">
      <h1>FindHomy</h1>
      <img src="onlylogo.png" alt="Logo" />
    </div>
    <div className="footer-box">
      <ul>
        <li><a href="https://www.youtube.com/watch?v=5E2dsqjoFXg&ab_channel=JohnTimston">About</a></li>
      </ul>
      <hr />
      <ul>
        <li><a href="https://www.youtube.com/watch?v=pCjBetzC8ME&ab_channel=Meow%3FWoof%21">Contact</a></li>
      </ul>
      <hr />
      <ul>
        <li><a href="https://www.youtube.com/watch?v=GfT5CqrWJW0&ab_channel=ALIBA">Terms of Service</a></li>
      </ul>
    </div>
    <div className="footer-box">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Explicabo repudiandae eveniet iure provident suscipit minus
      magnam facere, sit nihil veritatis. Dolorum illum ratione,
      corrupti dolorem eum pariatur alias expedita ullam.
    </div>
    <div className="copyright">© Copyright 2021 InsertFunnyName</div>
  </footer>
);

export default Footer;
