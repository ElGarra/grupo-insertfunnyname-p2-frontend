import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import './CommentEditForm.scss';

import apiClient, { parseErrors } from '../../../apis/backend';
import useAuth from '../../../hooks/useAuth';
import BaseForm from '../BaseForm/BaseForm';
import BaseButton from '../../BaseButton/BaseButton';
import TextArea from '../TextArea/TextArea';

const CommentEditForm = (props) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {
    propertyId, //
    commentId,
    initialValues,
    submitCallback,
  } = props;

  const validationSchema = Yup.object({
    body: Yup.string()
      .min(1, 'Comments must have at least one character')
      .max(500, 'Comments cannot be longer than 500 characters')
      .required('This field is required'),
  });

  const onSubmit = async (formValues) => {
    setLoading(true);
    try {
      const response = await apiClient.updatePropertyComment(
        propertyId,
        commentId,
        formValues,
        currentUser,
      );
      if (response.data.error) {
        parseErrors(response);
      }
      if (response.status !== 204) {
        throw new Error('Could not update comment');
      }
      setMessage('Comment updated successfully');
      setLoading(false);
      submitCallback(formValues);
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
      {loading ? <p className="subtitle1">Updating comment...</p> : null}
      {message ? <p className="subtitle1">{message}</p> : null}
    </BaseForm>
  );
};

CommentEditForm.propTypes = {
  propertyId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  initialValues: PropTypes.shape({
    body: PropTypes.string.isRequired,
  }).isRequired,
  submitCallback: PropTypes.func,
};

CommentEditForm.defaultProps = {
  submitCallback: () => {},
};

export default CommentEditForm;
