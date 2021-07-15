import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import './MeetingEditForm.scss';

import apiClient, { parseErrors } from '../../../apis/backend';
import useAuth from '../../../hooks/useAuth';
import BaseForm from '../BaseForm/BaseForm';
import TextInput from '../TextInput/TextInput';
import BaseButton from '../../BaseButton/BaseButton';
import Select from '../Select/Select';

const MeetingEditForm = (props) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { meetingId, parentCallback } = props;
  let { initialValues } = props;
  initialValues = { ...initialValues };

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
      const formData = { ...formValues };
      formData.date = new Date(`${formValues.datePart} ${formValues.timePart}`).toISOString();
      const response = await apiClient.updateMeeting(meetingId, formData, currentUser);
      if (response.data.error) {
        parseErrors(response);
      }
      if (response.status !== 204) {
        throw new Error('Could not update meeting');
      }
      setMessage('Meeting updated successfully');
      setLoading(false);
      parentCallback(formData);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <BaseForm title="Update Meeting">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <Select label="TypinitialValuese" id="type" name="type">
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

MeetingEditForm.propTypes = {
  meetingId: PropTypes.string.isRequired,
  initialValues: PropTypes.shape({
    datePart: PropTypes.string.isRequired,
    timePart: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['face-to-face', 'remote']).isRequired,
  }).isRequired,
  parentCallback: PropTypes.func,
};

MeetingEditForm.defaultProps = {
  parentCallback: () => {},
};

export default MeetingEditForm;
