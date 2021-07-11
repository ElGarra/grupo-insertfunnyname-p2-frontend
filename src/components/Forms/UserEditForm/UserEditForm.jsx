import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import './UserEditForm.scss';

import apiClient from '../../../apis/backend';
import BaseForm from '../BaseForm/BaseForm';
import TextInput from '../TextInput/TextInput';
import BaseButton from '../../BaseButton/BaseButton';
import useAuth from '../../../hooks/useAuth';

const UserEditForm = (props) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [avatarFile, setAvatarFile] = useState({});

  let { initialValues } = props;
  const { parentCallback } = props;

  initialValues = {
    ...initialValues, //
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(1, 'Your first name must be at least 1 character long')
      .max(70, 'Your first name cannot be longer than 70 characters'),
    lastName: Yup.string()
      .min(1, 'Your last name must be at least 1 character long')
      .max(70, 'Your last name cannot be longer than 70 characters'),
    email: Yup.string().email('Invalid email'),
    password: Yup.string().min(6, 'Your password is too short'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const onSubmit = async (formValues) => {
    setLoading(true);
    try {
      setMessage('');
      const response = await apiClient.updateUser({ ...formValues, avatarFile }, currentUser);
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
      if (response.status === 204) {
        setMessage('Information updated');
        parentCallback(formValues);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseForm>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {() => (
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
              label="New password"
              id="password"
              name="password"
              placeholder="New password"
            />
            <TextInput
              type="password"
              label="Password confirmation"
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="Password confirmation"
            />
            <TextInput
              type="file"
              label="Profile picture"
              id="avatarFile"
              name="avatarFile"
              onChange={async (e) => {
                setAvatarFile(e.currentTarget.files[0]);
              }}
            />
            <BaseButton type="submit">Submit</BaseButton>
          </Form>
        )}
      </Formik>
      {loading ? <p className="subtitle1">Creating user...</p> : null}
      {message ? <p className="subtitle1">{message}</p> : null}
    </BaseForm>
  );
};

UserEditForm.propTypes = {
  initialValues: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  parentCallback: PropTypes.func,
};

UserEditForm.defaultProps = {
  parentCallback: () => {},
};

export default UserEditForm;
