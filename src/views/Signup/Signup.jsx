import React from 'react';
import { Redirect } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import SignupForm from '../../components/Forms/SignupForm/SignupForm';

const Signup = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      {currentUser && <Redirect to="/" />}
      <h1>Create an account</h1>
      <SignupForm />
    </div>
  );
};

export default Signup;
