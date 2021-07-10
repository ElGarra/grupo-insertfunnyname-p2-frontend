import React from 'react';

import IndexCard from '../components/IndexCard/IndexCard';

const Properties = () => {
  const text = 'Properties';
  return (
    <div>
      <h1>{text}</h1>
      <div className="cards-list">
        <IndexCard />
        <IndexCard />
        <IndexCard />
        <IndexCard />
      </div>
    </div>
  );
};

export default Properties;
