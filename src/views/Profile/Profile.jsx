import React from 'react';
import { Redirect } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

const Profile = () => {
  const { currentUser } = useAuth();

  const text = 'Profile';
  return (
    <div>
      {currentUser || <Redirect to="/" />}
      <h1>{text}</h1>
    </div>
  );
};

export default Profile;
