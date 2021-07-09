import React from 'react';

import LoginForm from '../components/Forms/LoginForm/LoginForm';

const Login = () => {
  const title = 'Login';
  return (
    <div>
      <h1>{title}</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
