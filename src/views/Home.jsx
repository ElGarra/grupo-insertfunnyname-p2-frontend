import React from 'react';
import Button from '../components/BaseButton/BaseButton';

const Home = () => {
  const text = 'Test';
  return (
    <div>
      <h1>Button</h1>
      <Button>{text}</Button>
    </div>
  );
};

export default Home;
