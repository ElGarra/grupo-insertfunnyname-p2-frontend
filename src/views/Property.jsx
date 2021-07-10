import React from 'react';

import './Property.scss';

import FullPropertyCard from '../components/Cards/FullPropertyCard/FullPropertyCard';
import CommentCard from '../components/Cards/CommentCard/CommentCard';

const Property = () => {
  const tempUser = {
    firstName: 'Test',
    lastName: 'User',
    avatarLink: 'https://api.time.com/wp-content/uploads/2020/01/smudge-the-cat-interview.jpg',
  };
  const tempComment = {
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    createdAt: '12/12/2012',
  };
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
      <h1>Property</h1>
      <div className="post-column">
        <FullPropertyCard property={tempProperty} />
        <CommentCard user={tempUser} comment={tempComment} />
      </div>
    </div>
  );
};

export default Property;
