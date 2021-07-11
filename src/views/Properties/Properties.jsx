import React, { useEffect, useState } from 'react';

import './Properties.scss';

import IndexCard from '../../components/Cards/IndexCard/IndexCard';
import apiClient from '../../apis/backend';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(async () => {
    try {
      setLoading(true);
      setMessage('');
      const response = await apiClient.retrieveProperties();
      setProperties(response.data.properties);
      if (!properties) {
        setMessage('There are no properties to show, come back later!');
      }
    } catch (error) {
      setMessage('Could not retrieve properties!');
    } finally {
      setLoading(false);
    }
  }, []);

  // const tempProperty = {
  //   imageLink: 'https://homeworlddesign.com/wp-content/uploads/2019/08/Stark-House-5-880x660.jpg',
  //   title: 'Cool house',
  //   street: 'Cool street',
  //   streetNumber: 1337,
  //   commune: 'Puerto Varas',
  //   region: 'Los Lagos',
  //   description: 'nice house',
  //   bathrooms: 2,
  //   bedrooms: 5,
  //   size: 200,
  //   type: 'house',
  //   listingType: 'sale',
  //   price: 220000,
  //   createdAt: '12/12/2012',
  // };
  return (
    <div>
      <h1 className="view-title">Properties</h1>
      {loading ? <p className="subtitle1">Loading...</p> : null}
      {message ? (
        <p className="subtitle1">{message}</p>
      ) : (
        <div className="cards-list">
          {properties.map((property) => (
            <IndexCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;
