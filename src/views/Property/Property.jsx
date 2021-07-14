import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import './Property.scss';

import FullPropertyCard from '../../components/Cards/FullPropertyCard/FullPropertyCard';
import apiClient from '../../apis/backend';
import BaseButton from '../../components/BaseButton/BaseButton';
import BaseCard from '../../components/Cards/BaseCard/BaseCard';
import PropertyEditForm from '../../components/Forms/PropertyEditForm/PropertyEditForm';
import useAuth from '../../hooks/useAuth';
import CommentList from '../../components/CommentList/CommentList';
import ElementToggler from '../../components/ElementToggler/ElementToggler';
import MeetingForm from '../../components/Forms/MeetingForm/MeetingForm';
import MeetingList from '../../components/MeetingList/MeetingList';
import CommentForm from '../../components/Forms/CommentForm/CommentForm';

const Property = () => {
  const { currentUser } = useAuth();
  const { propertyId } = useParams();
  const history = useHistory();
  const [property, setProperty] = useState({});
  const [loadingProperty, setLoadingProperty] = useState(false);
  const [messageProperty, setMessageProperty] = useState('');
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [messageComments, setMessageComments] = useState('');
  const [meetings, setMeetings] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(false);
  const [messageMeetings, setMessageMeetings] = useState('');
  const [userOwnsProperty, setUserOwnsProperty] = useState(false);

  useEffect(async () => {
    try {
      setLoadingProperty(true);
      setMessageProperty('');
      const response = await apiClient.getProperty(propertyId);
      const propertyData = response.data.property;
      if (!propertyData) {
        throw new Error();
      }
      setUserOwnsProperty(
        currentUser && String(propertyData.userId) === String(jwtDecode(currentUser).sub),
      );
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
      const commentsData = response.data.comments;
      if (!commentsData) {
        throw new Error();
      }
      if (commentsData.length === 0) {
        setMessageComments('There are no comments to show');
      }
      setComments(response.data.comments);
    } catch (error) {
      setMessageComments('Could not retrieve property comments!');
    } finally {
      setLoadingComments(false);
    }
  }, []);

  useEffect(async () => {
    if (!userOwnsProperty) {
      return;
    }
    try {
      setLoadingMeetings(true);
      setMessageMeetings('');
      const response = await apiClient.retrievePropertyMeetings(propertyId, currentUser);
      const meetingsData = response.data.meetings;
      if (!meetingsData) {
        throw new Error();
      }
      if (meetingsData.length === 0) {
        setMessageMeetings('There are no meetings to show');
      }
      setMeetings(response.data.meetings);
    } catch (error) {
      setMessageMeetings('Could not retrieve property meetings!');
    } finally {
      setLoadingMeetings(false);
    }
  }, [userOwnsProperty]);

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

  const renderProperty = () => (
    <>
      {loadingProperty ? <p className="subtitle1">Loading...</p> : null}
      {messageProperty ? <p className="subtitle1">{messageProperty}</p> : null}
      {property.id ? <FullPropertyCard property={property} /> : null}
    </>
  );

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
    return (
      <>
        <ElementToggler prompt="Edit property">
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
        </ElementToggler>
        <BaseButton type="button" onClick={deleteProperty}>
          Delete property
        </BaseButton>
      </>
    );
  };

  const renderComments = () => (
    <>
      {loadingComments ? <p className="subtitle1">Loading...</p> : null}
      {messageComments ? <p className="subtitle1">{messageComments}</p> : null}
      <CommentList comments={comments} />
      {currentUser ? <CommentForm propertyId={propertyId} /> : null}
    </>
  );

  const renderMeetings = () => (
    <>
      {loadingMeetings ? <p className="subtitle1">Loading...</p> : null}
      {messageMeetings ? <p className="subtitle1">{messageMeetings}</p> : null}
      <MeetingList meetings={meetings} />
    </>
  );

  return (
    <div>
      <h1 className="view-title">Property</h1>
      <div className="post-column">
        {renderProperty()}
        {property.id && currentUser && !userOwnsProperty ? (
          <ElementToggler prompt="Book meeting">
            <MeetingForm propertyId={propertyId} />
          </ElementToggler>
        ) : null}
        {property.id && userOwnsProperty ? renderPropertyEdit() : null}
        {property.id && userOwnsProperty ? renderMeetings() : null}
        {renderComments()}
      </div>
    </div>
  );
};

export default Property;
