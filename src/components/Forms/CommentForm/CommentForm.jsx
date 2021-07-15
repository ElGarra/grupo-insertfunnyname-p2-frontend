import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import './CommentForm.scss';

import apiClient, { parseErrors } from '../../../apis/backend';
import useAuth from '../../../hooks/useAuth';
import BaseForm from '../BaseForm/BaseForm';
import BaseButton from '../../BaseButton/BaseButton';
import TextArea from '../TextArea/TextArea';

const CommentForm = ({ propertyId, submitCallback }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const initialValues = { body: '' };

  const validationSchema = Yup.object({
    body: Yup.string()
      .min(1, 'Comments must have at least one character')
      .max(500, 'Comments cannot be longer than 500 characters')
      .required('This field is required'),
  });

  const onSubmit = async (formValues) => {
    setLoading(true);
    try {
      const response = await apiClient.createPropertyComment(propertyId, formValues, currentUser);
      if (response.data.error) {
        parseErrors(response);
      }
      if (response.status !== 201) {
        throw new Error('Could not create comment');
      }
      setMessage('Comment created successfully');
      setLoading(false);
      submitCallback(response.data);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <BaseForm title="Create Comment">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <TextArea
            label="Comment body"
            id="body"
            name="body"
            placeholder="Write your comment here..."
            rows={3}
            minLength={1}
            maxLength={500}
          />
          <BaseButton type="submit">Submit</BaseButton>
        </Form>
      </Formik>
      {loading ? <p className="subtitle1">Creating comment...</p> : null}
      {message ? <p className="subtitle1">{message}</p> : null}
    </BaseForm>
  );
};

CommentForm.propTypes = {
  propertyId: PropTypes.string.isRequired,
  submitCallback: PropTypes.func,
};

CommentForm.defaultProps = {
  submitCallback: () => {},
};

export default CommentForm;
