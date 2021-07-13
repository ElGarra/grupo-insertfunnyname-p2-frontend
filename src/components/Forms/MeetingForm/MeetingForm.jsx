import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import './MeetingForm.scss';

import apiClient, { parseErrors } from '../../../apis/backend';
import useAuth from '../../../hooks/useAuth';
import BaseForm from '../BaseForm/BaseForm';
import TextInput from '../TextInput/TextInput';
import BaseButton from '../../BaseButton/BaseButton';
import Select from '../Select/Select';

const MeetingForm = ({ propertyId, submitCallback }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const initialValues = {
    type: '',
    datePart: '',
    timePart: '',
  };

  const validationSchema = Yup.object({
    datePart: Yup.date().required('This field is required'),
    timePart: Yup.string().required('This field is required'),
    type: Yup.string()
      .oneOf(['remote', 'face-to-face'], 'You must select a type of meeting')
      .required('This field is required'),
  });

  const onSubmit = async (formValues) => {
    setLoading(true);
    try {
      console.log(formValues);
      const formData = { ...formValues };
      formData.date = `${formValues.datePart} ${formValues.timePart}`;
      const response = await apiClient.createPropertyMeeting(propertyId, formData, currentUser);
      if (response.data.error) {
        parseErrors(response);
      }
      if (response.status !== 201) {
        throw new Error('Could not create meeting');
      }
      setMessage('Meeting created successfully');
      setLoading(false);
      submitCallback(response.data);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <BaseForm title="Create Meeting">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <Select label="Type" id="type" name="type">
            <option label=" " value="" />
            <option label="Remote" value="remote" />
            <option label="Face-to-face" value="face-to-face" />
          </Select>
          <TextInput type="date" label="Date" id="datePart" name="datePart" placeholder="Date" />
          <TextInput type="time" label="Time" id="timePart" name="timePart" placeholder="Time" />
          <BaseButton type="submit">Submit</BaseButton>
        </Form>
      </Formik>
      {loading ? <p className="subtitle1">Creating meeting...</p> : null}
      {message ? <p className="subtitle1">{message}</p> : null}
    </BaseForm>
  );
};

MeetingForm.propTypes = {
  propertyId: PropTypes.string.isRequired,
  submitCallback: PropTypes.func,
};

MeetingForm.defaultProps = {
  submitCallback: () => {},
};

export default MeetingForm;
