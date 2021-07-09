import React from 'react';

import SignupForm from '../components/Forms/SignupForm/SignupForm';

const Signup = () => {
  const title = 'Signup';
  return (
    <div>
      <h1>{title}</h1>
      <SignupForm />
    </div>
  );
};

export default Signup;
