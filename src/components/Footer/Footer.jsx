import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => (
  <footer className="Footer">
    <div id="logo-footer">
      <Link to="/">
        <h1 className="wordmark">FindHomy</h1>
        <img src="/logo512.png" alt="Logo" />
      </Link>
    </div>
    <div className="footer-box">
      <ul>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.youtube.com/watch?v=5E2dsqjoFXg&ab_channel=JohnTimston"
          >
            About
          </a>
        </li>
        <hr />
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.youtube.com/watch?v=pCjBetzC8ME&ab_channel=Meow%3FWoof%21"
          >
            Contact
          </a>
        </li>
        <hr />
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.youtube.com/watch?v=GfT5CqrWJW0&ab_channel=ALIBA"
          >
            Terms of Service
          </a>
        </li>
      </ul>
    </div>
    <div className="footer-box">
      <ul>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://documenter.getpostman.com/view/15970655/TzeTKA1X"
          >
            Docs
          </a>
        </li>
        <hr />
        <li>
          <a target="_blank" rel="noreferrer" href="https://trippybook.herokuapp.com/posts">
            TrippyBook
          </a>
        </li>
      </ul>
    </div>
    <div className="copyright">
      <span className="subtitle2">© Copyright 2021 InsertFunnyName</span>
    </div>
  </footer>
);

export default Footer;
