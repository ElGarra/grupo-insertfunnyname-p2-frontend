import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import './SignupForm.scss';

import backendAPI from '../../../apis/backend';
import BaseForm from '../BaseForm/BaseForm';
import TextInput from '../TextInput/TextInput';
import Checkbox from '../Checkbox/Checkbox';
import BaseButton from '../../BaseButton/BaseButton';

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    acceptedTerms: false,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(1, 'Your first name must be atleast 1 character long')
      .max(70, 'Your first name cannot be longer than 70 characters')
      .required('This field is required'),
    lastName: Yup.string()
      .min(1, 'Your lastname must be atleast 1 character long')
      .max(70, 'Your last name cannot be longer than 70 characters')
      .required('This field is required'),
    email: Yup.string().email('Invalid email').required('This field is required'),
    password: Yup.string().min(6, 'Your password is too short').required('This field is required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('This field is required'),
    acceptedTerms: Yup.boolean()
      .required('You must read and accept the terms and conditions')
      .oneOf([true], 'You must read and accept the terms and conditions'),
  });

  const onSubmit = async (formValues) => {
    setLoading(true);
    try {
      const response = await backendAPI.post('/users', formValues);
      const { error } = response.data;
      if (error) {
        let errorMessage = `${error}. `;
        const { errors } = response.data;
        if (errors) {
          errorMessage += Object.values(errors).join('. ');
          errorMessage += '.';
        }
        throw new Error(errorMessage);
      }
      setMessage('User has been successfuly created');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseForm title="Sign Up">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <TextInput
            type="text"
            label="First Name"
            id="firstName"
            name="firstName"
            placeholder="First Name"
          />
          <TextInput
            type="text"
            label="Last Name"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
          />
          <TextInput type="email" label="Email" id="email" name="email" placeholder="Email" />
          <TextInput
            type="password"
            label="Password"
            id="password"
            name="password"
            placeholder="Password"
          />
          <TextInput
            type="password"
            label="Password confirmation"
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="Password confirmation"
          />
          <Checkbox id="acceptedTerms" name="acceptedTerms">
            I accept the
            <a target="_blank" rel="noreferrer" href="https://www.youtube.com/watch?v=zVTsFKJ2nJE">
              {' '}
              Terms and Conditions
            </a>
          </Checkbox>
          <BaseButton type="submit">Submit</BaseButton>
        </Form>
      </Formik>
      {loading ? <p className="subtitle1">Creating user...</p> : null}
      {message ? <p className="subtitle1">{message}</p> : null}
    </BaseForm>
  );
};

export default SignupForm;
