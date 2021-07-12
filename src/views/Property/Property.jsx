import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import './Property.scss';

import FullPropertyCard from '../../components/Cards/FullPropertyCard/FullPropertyCard';
import CommentCard from '../../components/Cards/CommentCard/CommentCard';
import apiClient from '../../apis/backend';
import BaseButton from '../../components/BaseButton/BaseButton';
import BaseCard from '../../components/Cards/BaseCard/BaseCard';
import PropertyEditForm from '../../components/Forms/PropertyEditForm/PropertyEditForm';
import useAuth from '../../hooks/useAuth';

const Property = () => {
  const { currentUser } = useAuth();
  const { propertyId } = useParams();
  const history = useHistory();
  const [property, setProperty] = useState({});
  const [loadingProperty, setLoadingProperty] = useState(false);
  const [messageProperty, setMessageProperty] = useState('');
  const [viewPropertyEditForm, setViewPropertyEditForm] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [messageComments, setMessageComments] = useState('');

  useEffect(async () => {
    try {
      setLoadingProperty(true);
      setMessageProperty('');
      const response = await apiClient.getProperty(propertyId);
      const propertyData = response.data.property;
      if (!propertyData) {
        throw new Error();
      }
      setProperty(propertyData);
    } catch (error) {
      setMessageProperty('Could not retrieve property!');
    } finally {
      setLoadingProperty(false);
    }
  }, []);

  useEffect(async () => {
    try {
      setLoadingComments(true);
      setMessageComments('');
      const response = await apiClient.retrievePropertyComments(propertyId);
      setComments(response.data.comments);
    } catch (error) {
      setMessageComments('Could not retrieve property comments!');
    } finally {
      setLoadingComments(false);
    }
  }, []);

  useEffect(async () => {
    if (comments.length === 0) {
      setMessageComments('There are no comments to show');
    }
  }, [comments]);

  const updatePropertyInfo = (data) => {
    const newProperty = { ...property, ...data };
    setProperty(newProperty);
  };

  const deleteProperty = async () => {
    try {
      setLoadingProperty(true);
      setMessageProperty('');
      const response = await apiClient.deleteProperty(propertyId, currentUser);
      if (response.status !== 204) {
        throw new Error();
      }
      setLoadingProperty(false);
      history.push('/properties');
    } catch (error) {
      setMessageProperty('Could not delete property');
      setLoadingProperty(false);
    }
  };

  const renderPropertyEdit = () => {
    const {
      title,
      type,
      bathrooms,
      bedrooms,
      size,
      region,
      commune,
      street,
      streetNumber,
      description,
      price,
      listingType,
    } = property;
    if (!currentUser || String(jwtDecode(currentUser).sub) !== String(property.userId)) {
      return null;
    }
    return viewPropertyEditForm ? (
      <>
        <BaseCard padding>
          <PropertyEditForm
            propertyId={propertyId}
            initialValues={{
              title,
              type,
              bathrooms,
              bedrooms,
              size,
              region,
              commune,
              street,
              streetNumber,
              description,
              price,
              listingType,
            }}
            parentCallback={updatePropertyInfo}
          />
        </BaseCard>
        <BaseButton type="button" onClick={deleteProperty}>
          Delete property
        </BaseButton>
      </>
    ) : (
      <>
        <BaseButton type="button" onClick={() => setViewPropertyEditForm(true)}>
          Edit property
        </BaseButton>
        <BaseButton type="button" onClick={deleteProperty}>
          Delete property
        </BaseButton>
      </>
    );
  };

  const tempUser = {
    firstName: 'Test',
    lastName: 'User',
    avatarLink: 'https://api.time.com/wp-content/uploads/2020/01/smudge-the-cat-interview.jpg',
  };
  // const tempComment = {
  //   body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
  //   createdAt: '12/12/2012',
  // };
  return (
    <div>
      <h1 className="view-title">Property</h1>
      <div className="post-column">
        {loadingProperty ? <p className="subtitle1">Loading...</p> : null}
        {messageProperty ? <p className="subtitle1">{messageProperty}</p> : null}
        {property && property.id ? <FullPropertyCard property={property} /> : null}
        {currentUser && property && property.id ? renderPropertyEdit() : null}
        {loadingComments ? <p className="subtitle1">Loading...</p> : null}
        {messageComments ? <p className="subtitle1">{messageComments}</p> : null}
        {comments.map((comment) => (
          <CommentCard key={comment.id} user={tempUser} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Property;
