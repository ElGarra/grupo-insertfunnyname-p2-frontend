import React from 'react';
import { Redirect } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';

const Login = () => {
  const { currentUser, handleUserLogin } = useAuth();
  return (
    <div>
      {currentUser && <Redirect to="/" />}
      <h1 className="view-title">Log In</h1>
      <LoginForm submitCallback={handleUserLogin} />
    </div>
  );
};

export default Login;
