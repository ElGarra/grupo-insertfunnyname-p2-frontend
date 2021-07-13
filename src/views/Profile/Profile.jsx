import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import apiClient from '../../apis/backend';
import useAuth from '../../hooks/useAuth';
import ProfileCard from '../../components/Cards/ProfileCard/ProfileCard';
import UserEditForm from '../../components/Forms/UserEditForm/UserEditForm';
import BaseCard from '../../components/Cards/BaseCard/BaseCard';
import ElementToggler from '../../components/ElementToggler/ElementToggler';

const Profile = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  const updateUserInfo = (data) => {
    const newUser = { ...user, ...data };
    setUser(newUser);
  };

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
      {loading ? <p className="subtitle1">Loading...</p> : null}
      {message ? <p className="subtitle1">{message}</p> : null}
      {user.id ? renderProfileContents() : null}
    </div>
  );
};

export default Profile;
