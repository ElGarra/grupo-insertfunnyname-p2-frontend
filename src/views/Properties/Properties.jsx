import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';

import './Properties.scss';

import apiClient from '../../apis/backend';
import PropertyForm from '../../components/Forms/PropertyForm/PropertyForm';
import BaseCard from '../../components/Cards/BaseCard/BaseCard';
import useAuth from '../../hooks/useAuth';
import PropertyList from '../../components/PropertyList/PropertyList';
import ElementToggler from '../../components/ElementToggler/ElementToggler';
import Select from '../../components/Forms/Select/Select';
import TextInput from '../../components/Forms/TextInput/TextInput';

const Properties = () => {
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState([]);
  const [currentProperties, setCurrentProperties] = useState(properties);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState({
    keywords: [],
    type: '',
    listingType: '',
  });

  const updateQueryKeywords = (event) => {
    const searchString = event.currentTarget.value;
    const newQuery = { ...query };
    if (!searchString) {
      newQuery.keywords = [];
    } else {
      newQuery.keywords = searchString
        .toLowerCase()
        .split(' ')
        .filter((word) => word);
    }
    setQuery(newQuery);
  };

  const updateQueryListingType = (event) => {
    const newListingType = event.currentTarget.value;
    setQuery({ ...query, listingType: newListingType });
  };

  const updateQueryType = (event) => {
    const newType = event.currentTarget.value;
    setQuery({ ...query, type: newType });
  };

  const applyFilters = () => {
    const newProperties = properties.filter((property) => {
      const { title, type, listingType } = property;
      const { keywords } = query;
      const address = `${property.street} ${property.streetNumber} ${property.commune} ${property.region}`;
      const comp = `${title} ${address}`;
      const cond1 = keywords.length === 0 || keywords.some((w) => comp.toLowerCase().includes(w));
      const cond2 = !query.listingType || listingType === query.listingType;
      const cond3 = !query.type || type === query.type;
      return cond1 && cond2 && cond3;
    });
    setCurrentProperties(newProperties);
  };

  useEffect(async () => {
    applyFilters();
  }, [query]);

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
      setCurrentProperties(propertiesData);
    } catch (error) {
      setMessage('Could not retrieve properties!');
    } finally {
      setLoading(false);
    }
  }, []);

  const initialValues = {
    queryKeywords: '',
    queryListingType: '',
    queryType: '',
  };

  const renderQueryForm = () => (
    <div className="query-form">
      <Formik onSubmit={() => {}} initialValues={initialValues}>
        {({ handleChange }) => (
          <Form>
            <TextInput
              type="text"
              label="Keywords"
              id="queryKeywords"
              name="queryKeywords"
              placeholder="Search for properties..."
              onChange={(e) => {
                handleChange(e);
                updateQueryKeywords(e);
              }}
            />
            <Select
              label="Listing Type"
              id="queryListingType"
              name="queryListingType"
              onChange={(e) => {
                handleChange(e);
                updateQueryListingType(e);
              }}
            >
              <option label=" " value="" />
              <option label="Sale" value="sale" />
              <option label="Rent" value="rent" />
            </Select>
            <Select
              label="Type"
              id="queryType"
              name="queryType"
              onChange={(e) => {
                handleChange(e);
                updateQueryType(e);
              }}
            >
              <option label=" " value="" />
              <option label="House" value="house" />
              <option label="Apartment" value="apartment" />
              <option label="Tent" value="tent" />
              <option label="Cabin" value="cabin" />
              <option label="Lot" value="lot" />
              <option label="Farm" value="farm" />
              <option label="Room" value="room" />
              <option label="Mansion" value="mansion" />
              <option label="Business" value="business" />
              <option label="Office" value="office" />
              <option label="Other" value="other" />
            </Select>
          </Form>
        )}
      </Formik>
    </div>
  );

  return (
    <div>
      <h1 className="view-title">Properties</h1>
      {renderQueryForm()}
      {loading ? <p className="subtitle1">Loading...</p> : null}
      {message ? <p className="subtitle1">{message}</p> : null}
      {currentUser ? (
        <ElementToggler prompt="Create property">
          <BaseCard padding>
            <PropertyForm />
          </BaseCard>
        </ElementToggler>
      ) : null}
      <PropertyList properties={currentProperties} />
    </div>
  );
};

export default Properties;
