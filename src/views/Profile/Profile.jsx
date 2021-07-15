import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import apiClient from '../../apis/backend';
import useAuth from '../../hooks/useAuth';
import ProfileCard from '../../components/Cards/ProfileCard/ProfileCard';
import UserEditForm from '../../components/Forms/UserEditForm/UserEditForm';
import BaseCard from '../../components/Cards/BaseCard/BaseCard';
import ElementToggler from '../../components/ElementToggler/ElementToggler';
import MeetingList from '../../components/MeetingList/MeetingList';

const Profile = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [loadingMeetings, setLoadingMeetings] = useState(false);
  const [messageMeetings, setMessageMeetings] = useState('');
  const [meetings, setMeetings] = useState({ sellerMeetings: [], buyerMeetings: [] });

  useEffect(async () => {
    try {
      setLoading(true);
      setMessage('');
      const response = await apiClient.retrieveUserProfile(currentUser);
      const userData = response.data.user;
      if (!userData) {
        throw new Error();
      }
      setUser(userData);
    } catch (error) {
      setMessage('Could not retrieve user!');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(async () => {
    try {
      setLoadingMeetings(true);
      setMessageMeetings('');
      const response = await apiClient.retrieveUserMeetings(currentUser);
      const sellerMeetingsData = response.data.sellerMeetings;
      const buyerMeetingsData = response.data.buyerMeetings;
      if (!sellerMeetingsData || !buyerMeetingsData) {
        throw new Error();
      }
      let newMessage = '';
      if (sellerMeetingsData.length === 0) {
        newMessage += 'There are no seller meetings to show. ';
      }
      if (buyerMeetingsData.length === 0) {
        newMessage += 'There are no buyer meetings to show. ';
      }
      setMessageMeetings(newMessage);
      setMeetings({ sellerMeetings: sellerMeetingsData, buyerMeetings: buyerMeetingsData });
    } catch (error) {
      setMessageMeetings('Could not retrieve user meetings!');
    } finally {
      setLoadingMeetings(false);
    }
  }, []);

  const updateUserInfo = (data) => {
    const newUser = { ...user, ...data };
    setUser(newUser);
  };

  const renderMeetings = () => (
    <>
      {!loadingMeetings ? (
        <>
          <h4>My Meetings</h4>
          <MeetingList meetings={meetings.sellerMeetings} title="Seller Meetings" />
          <MeetingList meetings={meetings.buyerMeetings} title="Buyer Meetings" />
        </>
      ) : null}
      {loadingMeetings ? <p className="subtitle1">Loading...</p> : null}
      {messageMeetings ? <p className="subtitle1">{messageMeetings}</p> : null}
    </>
  );

  const renderProfileContents = () => {
    const { firstName, lastName, email } = user;
    return (
      <>
        <ProfileCard user={user} />
        <ElementToggler prompt="Edit profile">
          <BaseCard padding>
            <UserEditForm
              initialValues={{ firstName, lastName, email }}
              parentCallback={updateUserInfo}
            />
          </BaseCard>
        </ElementToggler>
      </>
    );
  };

  return (
    <div>
      {!currentUser && <Redirect to="/" />}
      <h1 className="view-title">Profile</h1>
      {user.id ? renderProfileContents() : null}
      {loading ? <p className="subtitle1">Loading...</p> : null}
      {message ? <p className="subtitle1">{message}</p> : null}
      {renderMeetings()}
    </div>
  );
};

export default Profile;
