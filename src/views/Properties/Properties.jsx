import React from 'react';

import './Properties.scss';

import IndexCard from '../../components/Cards/IndexCard/IndexCard';

const Properties = () => {
  const tempProperty = {
    imageLink: 'https://homeworlddesign.com/wp-content/uploads/2019/08/Stark-House-5-880x660.jpg',
    title: 'Cool house',
    street: 'Cool street',
    streetNumber: 1337,
    commune: 'Puerto Varas',
    region: 'Los Lagos',
    description: 'nice house',
    bathrooms: 2,
    bedrooms: 5,
    size: 200,
    type: 'house',
    listingType: 'sale',
    price: 220000,
    createdAt: '12/12/2012',
  };
  return (
    <div>
      <h1>Properties</h1>
      <div className="cards-list">
        <IndexCard property={tempProperty} />
        <IndexCard property={tempProperty} />
        <IndexCard property={tempProperty} />
        <IndexCard property={tempProperty} />
      </div>
    </div>
  );
};

export default Properties;
