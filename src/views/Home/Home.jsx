import React from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';

import BaseButton from '../../components/BaseButton/BaseButton';

const Home = () => {
  const text = 'Browse our properties';
  return (
    <div className="Home">
      <div className="landing-image">
        <img
          src="https://images.unsplash.com/photo-1524813686514-a57563d77965"
          alt="Welcome to FindHomy"
        />
      </div>
      <div className="access-button">
        <h1>Welcome</h1>
        <Link to="properties">
          <BaseButton>{text}</BaseButton>
        </Link>
      </div>
    </div>
  );
};

export default Home;
