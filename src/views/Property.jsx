import React from 'react';
import FullProperty from '../components/FullProperty/FullProperty';
import CommentCard from '../components/CommentCard/CommentCard';
import './Property.scss';

const Property = () => {
  const text = 'Property';
  return (
    <div>
      <h1>{text}</h1>
      <div className="post-column">
        <FullProperty />
        <CommentCard />
      </div>
    </div>
  );
};

export default Property;
