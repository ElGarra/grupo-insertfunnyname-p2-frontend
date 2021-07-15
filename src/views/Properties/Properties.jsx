import React, { useEffect, useState } from 'react';

import './Properties.scss';

import apiClient from '../../apis/backend';
import PropertyForm from '../../components/Forms/PropertyForm/PropertyForm';
import BaseCard from '../../components/Cards/BaseCard/BaseCard';
import useAuth from '../../hooks/useAuth';
import PropertyList from '../../components/PropertyList/PropertyList';
import ElementToggler from '../../components/ElementToggler/ElementToggler';
import SearchBar from '../../components/SearchBar/SearchBar';

const Properties = () => {
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(async () => {
    try {
      setLoading(true);
      setMessage('');
      const response = await apiClient.retrieveProperties();
      const propertiesData = response.data.properties;
      if (!propertiesData) {
        throw new Error();
      }
      if (propertiesData.length === 0) {
        setMessage('There are no properties to show, come back later!');
      }
      setProperties(propertiesData);
    } catch (error) {
      setMessage('Could not retrieve properties!');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <h1 className="view-title">Properties</h1>
      <SearchBar />
      {loading ? <p className="subtitle1">Loading...</p> : null}
      {message ? <p className="subtitle1">{message}</p> : null}
      {currentUser ? (
        <ElementToggler prompt="Create property">
          <BaseCard padding>
            <PropertyForm />
          </BaseCard>
        </ElementToggler>
      ) : null}
      <PropertyList properties={properties} />
    </div>
  );
};

export default Properties;
