import React from 'react';
import BaseButton from '../../components/BaseButton/BaseButton';

const Home = () => {
  const text = 'Test';
  return (
    <div>
      <h1>THIS IS THE HOMEPAGE</h1>
      <BaseButton>{text}</BaseButton>
    </div>
  );
};

export default Home;
