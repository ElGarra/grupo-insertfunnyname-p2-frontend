import React, { useEffect, useState } from 'react';

import './Properties.scss';

import IndexCard from '../../components/Cards/IndexCard/IndexCard';
import apiClient from '../../apis/backend';
import BaseButton from '../../components/BaseButton/BaseButton';
import PropertyForm from '../../components/Forms/PropertyForm/PropertyForm';
import BaseCard from '../../components/Cards/BaseCard/BaseCard';
import useAuth from '../../hooks/useAuth';

const Properties = () => {
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [viewForm, setViewForm] = useState(false);

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

  return (
    <div>
      <h1 className="view-title">Properties</h1>
      {loading ? <p className="subtitle1">Loading...</p> : null}
      {message ? <p className="subtitle1">{message}</p> : null}
      {currentUser ? (
        <BaseButton type="button" onClick={() => setViewForm(true)}>
          Create property
        </BaseButton>
      ) : null}
      {viewForm ? (
        <BaseCard padding>
          <PropertyForm />
        </BaseCard>
      ) : null}
      {properties ? (
        <div className="cards-list">
          {properties.map((property) => (
            <IndexCard key={property.id} property={property} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Properties;
