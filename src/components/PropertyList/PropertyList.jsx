import React from 'react';
import PropTypes from 'prop-types';

import './PropertyList.scss';
import IndexCard from '../Cards/IndexCard/IndexCard';

const PropertyList = (props) => {
  const { properties } = props;
  return (
    <div className="PropertyList">
      {properties.map((property) => (
        <IndexCard key={property.id} property={property} />
      ))}
    </div>
  );
};

PropertyList.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PropertyList;
